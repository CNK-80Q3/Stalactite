import { connect } from 'dva';
import loginStyle from './login.css';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';

const FormItem = Form.Item;

function login({ dispatch, form }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, userData) => {
      if (!err) {
                new Promise((resolve, reject) => {
          dispatch({
            type: 'userLogin/doLogin',
            payload: {
              userData,
              resolve,
              reject
            }
          });
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

  return (
    <Form onSubmit={handleSubmit} className={loginStyle.login_form}>
      <FormItem>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请正确输入邮箱账号！', pattern: new RegExp(/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/, "g") }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码！' }],
        })(
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>记住我</Checkbox>
        )}
        <a className={loginStyle.login_form_forgot} href="">忘记密码</a>
        <Button type="primary" htmlType="submit" className={loginStyle.login_form_button}>
          登录
        </Button>
        或 <a href="/register/page">现在注册！</a>
      </FormItem>
    </Form>
  );
}

const LoginForm = Form.create()(login);

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LoginForm);
