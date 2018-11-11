import React from 'react';
import ReactDOM from 'react-dom';
import '../LoginForm/LoginForm.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { CONTAINER, COINAGE_LOGO, COINAGE_TITLE, INPUT, REMEMBER_ME, FORGET_PASSWORD, LOGIN_BUTTON, REGISTER} from '../LoginForm/LoginFormStyle.js';
import { Grid, Row, Col } from '../../components/Grid/Grid';
const FormItem = Form.Item;


class LoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (

          <div style={CONTAINER}>
            <Form onSubmit={this.handleSubmit} className="login-form">
          
            
            {/*<Col span={8}>
            </Col>
            <Col span={8}>
              <Row style={{padding: '120px 0px 10px 0px'}}>
                <Col span={12}>
                  <h2 style={COINAGE_LOGO}> <Icon type="copyright" /> </h2>
                </Col>
              </Row>
              <Row style={{padding: '10px 0px 10px 0px'}}>
                <Col span={12}>
                  <h2 style={COINAGE_LOGO}> KOINIJ </h2>
                </Col>
              </Row>
              <Row style={{padding: '10px 0px 10px 0px'}}>
                <Input style={INPUT} prefix={<Icon type="user"  />} placeholder="USERNAME" />
              </Row>
              <Row style={{padding: '10px 0px 10px 0px'}}>
                <Input style={INPUT} prefix={<Icon type="user"  />} placeholder="USERNAME" />
              </Row>
              <Row style={{padding: '10px 0px 10px 0px'}}>
                <Col span={1}>
                  <Checkbox></Checkbox>
                </Col>
                <Col span={6}>
                  <h2 style={REMEMBER_ME}>Remember me</h2>
                </Col>
                <Col span={6}>
                  <Button style={FORGET_PASSWORD}>Forget Password</Button>
                </Col>
              </Row> 
              <Row>
                <Button type="primary" style={LOGIN_BUTTON}>LOGIN</Button>  
              </Row>
              <Row>
                <Col span={12}>
                  <Button style={REGISTER}>or register now!</Button>   
                </Col>
              </Row>
            </Col>*/}
            <Grid>
              <Row style={{justifyContent: 'center'}}>
                <Col size={{xs: 12, sm: 8, md: 6, lg: 4}}>
                  <Row>
                    <Col size={{xs:12}}>
                      <h2 style={COINAGE_LOGO}> <Icon type="copyright" /> </h2>
                    </Col>
                  </Row>
                  <Row>
                    <h2 style={COINAGE_LOGO}> KOINIJ </h2>
                  </Row>
                  <Row>
                    <Col size={{xs:12, sm:12}}>
                      <Input style={INPUT} prefix={<Icon type="user"  />} placeholder="USERNAME" />
                    </Col>
                  </Row>
                  <Row>
                    <Col size={{xs:12, sm:12}}>
                      <Input style={INPUT} prefix={<Icon type="lock"  />} placeholder="PASSWORD" />
                    </Col>
                  </Row>
                  <Row>
                    <Col size={{xs:12, sm:6}} style={{display:'flex'}}>
                      <Checkbox></Checkbox>
                      <h2 style={REMEMBER_ME}>Remember me</h2>
                    </Col>
                    <Col size={{xs:12, sm:6}}>
                      <Button style={FORGET_PASSWORD}>Forget Password</Button>
                    </Col>
                  
                  </Row>
                  <Row>
                    <Col size={{xs:12, sm:12}}>
                      <Button type="primary" style={LOGIN_BUTTON}>LOGIN</Button>  
                    </Col>
                  </Row>
                  <Row>
                    <Col size={{xs:12, sm:12}}>
                      <Button style={REGISTER}>or register now!</Button>  
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

