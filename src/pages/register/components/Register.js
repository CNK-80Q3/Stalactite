import { connect } from 'dva';
import loginStyle from './Register.css';
import { Form, Icon, Input, Button, Checkbox, Modal, Upload, Select } from 'antd';
import PicturesUpload from '../../../layouts/components/PicturesUpload';
import Avatar from './Avatar';

const FormItem = Form.Item;
const Option = Select.Option;

function register({ dispatch, form }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, userData) => {
      if (!err) {
        new Promise((resolve, reject) => {
          dispatch({
            type: 'register/doRegist',
            payload: {
              userData,
              resolve,
              reject
            }
          });
          console.log(form)
        }).then(null, (data) => {
          Modal.error({
            title: '错误提示',
            content: <p style={{ fontSize: 14 }}>{data.msg}</p>
          });
        });
      }
    });
  }

  const { getFieldDecorator } = form;
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  //  密码验证
  const passwordValidator = (rule, value, callback) => {
    const { getFieldValue } = form;
    if (value && value !== getFieldValue('registPsd')) {
      callback('两次输入不一致！')
    }

    // 必须总是返回一个 callback，否则 validateFields 无法响应
    callback();
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Form onSubmit={handleSubmit} className={loginStyle.login_form}>
      <PicturesUpload form={form} num={1} lable={"上传头像"} formItemLayout={formItemLayout} />
      <FormItem>
        {getFieldDecorator('registAccount', {
          rules: [{ required: true, message: '请输入您的邮箱！', pattern: new RegExp(/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/, "g") }],
        })(
          <Input prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('registName', {
          rules: [{ required: true, message: '请输入您的用户名！' }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('registSex', {
          rules: [{ required: true, message: '请选择您的性别！' }],
        })(
          <Select placeholder="性别">
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('registPsd', {
          rules: [{ required: true, message: '密码8-18位，必须含大小写字母、数字和特殊字符！', pattern: new RegExp(/^.*(?=.{8,18})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/, "g") }],
        })(
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('registPsdConfirm', {
          rules: [{ required: true, min: 8, max: 18, validator: passwordValidator }],
        })(
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>记住我</Checkbox>
        )}
        <Button type="primary" htmlType="submit" className={loginStyle.login_form_button}>
          注册
        </Button>
        或 <a href="/login/page">您已拥有账号！</a>
      </FormItem>
    </Form>
  );
}

const RegisterForm = Form.create()(register);

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RegisterForm);
