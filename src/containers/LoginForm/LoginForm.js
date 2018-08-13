import React from 'react';
import ReactDOM from 'react-dom';
//import '../LoginForm/LoginForm.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


class LoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (

          <div className="form">
          <Form onSubmit={this.handleSubmit} className="login-form">
          <p className="loginTitle"> Coinage </p>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user"  />} style={{ marginBottom: '1'}} placeholder="USERNAME" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" />} type="password" placeholder="●●●●●●●" />
              )}
            </FormItem>
            <FormItem>

              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}

              <a className="login-form-forgot" href="">Forgot password</a>

              <Button type="primary" htmlType="submit" className="login-form-button">
                Login
              </Button>

              <p className="registration">or <a href="">register now!</a></p>

            </FormItem>
          </Form>

          </div>
        
        );
      }
}
export default Form.create()(LoginForm);

