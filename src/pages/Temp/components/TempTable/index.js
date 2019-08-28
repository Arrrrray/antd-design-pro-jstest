import React, { PureComponent } from 'react';
import { Table, Badge } from 'antd';
import { Link } from 'dva/router';
import { formatDateTime } from '@/utils/utils';
import ListForTable from '@/components/ListForTable';

class AdvertisingListTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    needTotalList: [],
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'ad_id',
      key: 'ad_id',
      rowKey: 'ad_id',
    },
    {
      title: '是否生效',
      dataIndex: 'is_active',
      render(val) {
        return <Badge status={val ? 'success' : 'error'} text={val ? '是' : '否'} />;
      },
    },
    {
      title: '名称/描述',
      dataIndex: 'title',
      render(title, record) {
        const data = [title, record.desc];
        return <ListForTable data={data} />;
      },
    },
    {
      title: '领券样式',
      dataIndex: 'style_text',
    },
    {
      title: <ListForTable data={['开始时间', '结束时间', '更新时间', '创建时间']} />,
      dataIndex: 'start_time',
      render(start_time, record) {
        const data = [
          formatDateTime(start_time),
          formatDateTime(record.end_time),
          formatDateTime(record.update_time),
          formatDateTime(record.create_time),
        ];
        return <ListForTable data={data} />;
      },
    },
    {
      title: '操作',
      align: 'center',
      render: record => {
        const { ad_id, is_active, style } = record;
        return (
          <React.Fragment>
            {is_active ? (
              <span
                onClick={() => {
                  this.handleDisableAdvertising(ad_id);
                }}
                style={{ color: '#1890ff', cursor: 'pointer', display: 'block' }}
              >
                下线
              </span>
            ) : (
                <span
                  onClick={() => {
                    this.handleEnableAdvertising(ad_id);
                  }}
                  style={{ color: '#1890ff', cursor: 'pointer', display: 'block' }}
                >
                  上线
              </span>
              )}
            {/* <Link to={`/activity/detail/${record.id}/`}>查看</Link> */}
            <Link
              to={`/advertising/mainInfo/${ad_id}`}
              style={{ color: '#1890ff', cursor: 'pointer', display: 'block' }}
            >
              修改基本信息
            </Link>
            {style !== 'OneBrandNoCoupon' ? (
              <Link
                to={`/advertising/coupon/${ad_id}/?style=${style}`}
                style={{ color: '#1890ff', cursor: 'pointer', display: 'block' }}
              >
                修改优惠券
              </Link>
            ) : null}
          </React.Fragment>
        );
      },
    },
  ];

  handleEnableAdvertising = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'advertising_list/enableAdvertising',
      payload: id,
    });
  };

  handleDisableAdvertising = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'advertising_list/disableAdvertising',
      payload: id,
    });
  };

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { needTotalList } = this.state;
    const { onSelectRow } = this.props;
    let newNeedTotalList = [...needTotalList];
    newNeedTotalList = newNeedTotalList.map(item => {
      return {
        ...item,
        total: selectedRows.reduce((sum, val) => {
          return sum + parseFloat(val[item.dataIndex], 10);
        }, 0),
      };
    });

    if (onSelectRow) {
      onSelectRow(selectedRowKeys, selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList: newNeedTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { data, pagination, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };

    return (
      <Table
        loading={loading}
        rowKey={record => record.ad_id}
        rowSelection={rowSelection}
        dataSource={data}
        columns={this.columns}
        pagination={paginationProps}
        onChange={this.handleTableChange}
        // scroll={{ x: 1600 }}
        size="small"
      />
    );
  }
}

export default AdvertisingListTable;
