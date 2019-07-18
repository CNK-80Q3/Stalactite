import { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import PicturesUpload from '../../../layouts/components/PicturesUpload';
import styles from './Microblog.css';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class MicroblogModal extends Component {

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
    //获取session中用户信息
    let userInfo = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : undefined;
    let account = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).account : undefined;
    let nickname = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).nickname : undefined;
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      //自动补足用户信息
      values.account = account;
      values.nickname = nickname;
      
      if (!err) {
        onOk(values);
        //点击确定，关闭新建模态框
        this.hideModelHandler();
      }
    });
    
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { content, account, role } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { form } = this.props
    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title={this.props.record._id ? '编辑' : '新建'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          className={styles.modal}
          width="650px"
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="内容"
            >
              {
                getFieldDecorator('content', {
                  initialValue: content,
                })(<TextArea autosize/>)
              }
            </FormItem>
            <PicturesUpload form={form} num={9} lable="配图" formItemLayout={formItemLayout}  /> 
            <FormItem
              {...formItemLayout}
              label="可见范围"
            >
              {
                getFieldDecorator('role', {
                  initialValue: role === 0 ? '所有人可见' : '仅自己可见',
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="0">所有人可见</Option>
                    <Option value="1">仅自己可见</Option>
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

export default Form.create()(MicroblogModal);