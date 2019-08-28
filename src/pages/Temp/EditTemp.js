import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Select,
  Input,
  DatePicker,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
@connect(state => {
  return {};
})
@Form.create()
class index extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  render() {
    const { } = this.props;
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择开始/结束时间!' }],
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ backgroundColor: '#fff' }}>
        <Form.Item label="广告名称">
          {getFieldDecorator('name', {
            rules: [{ message: '请输入广告名称' }],
          })(<Input placeholder="请输入广告名称" />)}
        </Form.Item>
        <Form.Item label="广告描述">
          {getFieldDecorator('description', {
            rules: [{ message: '请输入广告描述' }],
          })(<Input placeholder="请输入广告描述" />)}
        </Form.Item>
        <Form.Item label="开始/结束时间">
          {getFieldDecorator('time', rangeConfig)(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </Form.Item>
        <Form.Item label="挂件样式" hasFeedback>
          {getFieldDecorator('widget_type', {
            rules: [{ required: true, message: '请选择挂件样式' }],
          })(
            <Select defaultValue="widget_1" placeholder="请选择挂件样式">
              <Select.Option value="widget_1" default>
                样式一
              </Select.Option>
              <Select.Option value="widget_2">样式二</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="链接" hasFeedback>
          {getFieldDecorator('destination_url', {
            rules: [{ required: true, message: '请选择连接类型' }],
          })(
            <Select placeholder="请选择连接类型">
              <Select.Option value="china">China</Select.Option>
              <Select.Option value="usa">U.S.A</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="展示范围">
          {getFieldDecorator('select-multiple', {
            rules: [{ required: true, message: '请选择展示范围', type: 'array' }],
          })(
            <Select mode="multiple" placeholder="请选择展示范围">
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="blue">Blue</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="统计模块名称">
          {getFieldDecorator('service_name', { initialValue: 3 })(<Input />)}
        </Form.Item>

        <Form.Item label="主图片" extra="建议尺寸：82x120px">
          {getFieldDecorator('image_id', {
            required: true,
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="default">
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default index;
