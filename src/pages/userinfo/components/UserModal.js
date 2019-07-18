import { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class UserModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name,account, sex, role } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={this.props.record._id ? '编辑' : '新建'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="昵称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            {
              this.props.record._id ?
                (
                  <div></div>
                )
                :
                (
                  <FormItem
                    {...formItemLayout}
                    label="账户"
                  >
                    {
                      getFieldDecorator('account', {
                        initialValue: account,
                      })(<Input />)
                    }
                  </FormItem>
                )
            }
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {
                getFieldDecorator('sex', {
                  initialValue: sex === 0 ? '男' : '女',
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="权限"
            >
              {
                getFieldDecorator('role', {
                  initialValue: role === 0 ? '普通用户' : '管理员',
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="0">普通用户</Option>
                    <Option value="1">管理员</Option>
                  </Select>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserModal);
