import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TempTable from './components/TempTable';

@connect(state => {
  return {
    tempList: state.temp.tempList,
    loading: state.temp.loading,
  };
})
class index extends PureComponent {
  componentDidMount() {
    // this.getTempList();
  }

  // 获取数据列表
  getTempList = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'temp/getTempList',
      payload: params,
    });
  };

  handleStandardTableChange = pagination => {
    const params = {
      page: pagination.current,
      page_size: pagination.pageSize,
    };
    this.getTempList(params);
  };

  addNewTemp = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/temp/addTemp`));
  };

  render() {
    const { tempList: { list, pagination }, loading, dispatch, } = this.props;
    return (
      <PageHeaderWrapper title="Temp列表">
        <Card bordered={false}>
          <Button onClick={this.addNewTemp} style={{ marginBottom: '20px' }}>
            添加一个广告
          </Button>
          <TempTable
            dispatch={dispatch}
            loading={loading}
            pagination={pagination}
            data={list}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default index;
