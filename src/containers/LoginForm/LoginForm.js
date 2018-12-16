import React from 'react';
// import ReactDOM from 'react-dom';
// import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../LoginForm/LoginForm.css';
import { CONTAINER, COINAGE_LOGO, INPUT, REMEMBER_ME, FORGET_PASSWORD, LOGIN_BUTTON, REGISTER } from '../LoginForm/LoginFormStyle.js';
import { Grid, Row, Col } from '../../components/Grid/Grid';
// const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  onRegister = () => {
    this.setState({
      redirect: true,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    return (
      <div style={CONTAINER}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Grid center style={{ paddingTop: '15vh' }}>
            <Row center>
              <Col size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
                <Row>
                  <h2 style={COINAGE_LOGO}> Koinij </h2>
                </Row>
                <Row>
                  <Col size={{ xs: 12, sm: 12 }}>
                    <Input style={INPUT} prefix={<Icon type="user" />} placeholder="USERNAME" className="login" />
                  </Col>
                </Row>
                <Row>
                  <Col size={{ xs: 12, sm: 12 }}>
                    <Input style={INPUT} prefix={<Icon type="lock" />} placeholder="PASSWORD" />
                  </Col>
                </Row>
                <Row>
                  <Col size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                    <Checkbox />
                    <h2 style={REMEMBER_ME}>Remember me</h2>
                  </Col>
                  <Col size={{ xs: 12, sm: 6 }}>
                    <Button style={FORGET_PASSWORD}>Forget Password</Button>
                  </Col>

                </Row>
                <Row>
                  <Col size={{ xs: 12, sm: 12 }}>
                    <Button type="primary" style={LOGIN_BUTTON}>LOGIN</Button>
                  </Col>
                </Row>
                <Row>
                  <Col size={{ xs: 12, sm: 12 }}>
                    <Button onClick={this.onRegister} style={REGISTER}>or register now!</Button>
                  </Col>
                </Row>
              </Col>

            </Row>
          </Grid>
        </Form>
      </div>
    );
  }
}
export default Form.create()(LoginForm);

// class LoginForm extends React.Component {

//   state = {
//     redirect: false
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//   }

//   onRegister = () => {
//     this.setState({
//       redirect: true
//     })
//   }

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     const { redirect } = this.state;
//     if (redirect) {
//       return <Redirect to='/register' />;
//     }
//     return (

//       <div style={CONTAINER}>
//         <Form onSubmit={this.handleSubmit} className="login-form">

//           <Grid center style={{ paddingTop: '15vh' }}>
//             <Row center>
//               <Col size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
//                 <Row>
//                   <Col size={{ xs: 12 }}>
//                     <h2 style={COINAGE_LOGO}> <Icon type="copyright" /> </h2>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <h2 style={COINAGE_LOGO}> KOINIJ </h2>
//                 </Row>
//                 <Row>
//                   <Col size={{ xs: 12, sm: 12 }}>
//                     <Input style={INPUT} prefix={<Icon type="user" />} placeholder="USERNAME" />
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col size={{ xs: 12, sm: 12 }}>
//                     <Input style={INPUT} prefix={<Icon type="lock" />} placeholder="PASSWORD" />
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
//                     <Checkbox></Checkbox>
//                     <h2 style={REMEMBER_ME}>Remember me</h2>
//                   </Col>
//                   <Col size={{ xs: 12, sm: 6 }}>
//                     <Button style={FORGET_PASSWORD}>Forget Password</Button>
//                   </Col>

//                 </Row>
//                 <Row>
//                   <Col size={{ xs: 12, sm: 12 }}>
//                     <Button type="primary" style={LOGIN_BUTTON}>LOGIN</Button>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col size={{ xs: 12, sm: 12 }}>
//                     <Button onClick={this.onRegister} style={REGISTER}>or register now!</Button>
//                   </Col>
//                 </Row>
//               </Col>

//             </Row>
//           </Grid>

//         </Form>

//       </div>
//     );
//   }
// }
// export default Form.create()(LoginForm);

