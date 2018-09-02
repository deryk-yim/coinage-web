import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
<<<<<<< HEAD
import { CONTAINER, COINAGE_TITLE, SIGNUP, SIGNUP_TITLE, TERMS_AND_COND, LOGIN} from '../RegisterForm/RegisterFormStyle.js';
=======
import { CONTAINER, COINAGE_TITLE, SIGNUP_TITLE, SIGNUP_BUTTON, LOGIN_LINK, TERMS_AND_COND } from '../RegisterForm/RegisterFormStyle.js';

>>>>>>> refs/remotes/origin/dashboard


class RegisterForm extends Component {
    render() {
        return (
            <div style={CONTAINER}>
<<<<<<< HEAD
                
                <Row>
                    <h2 style={COINAGE_TITLE}> <Icon type="copyright" /> Coinage </h2>
                </Row>
            
                <Col span={8}>
                </Col>

                <Col span={8}>
                    <Row>
                        <h2 style={SIGNUP_TITLE}>SIGN UP </h2>
                    </Row>
                    <Row style={{padding: '10px 0px 10px 0px'}}>
                        <Input prefix={<Icon type="user" />} placeholder="USERNAME" />
                    </Row>
                    <Row style={{padding: '10px 0px 10px 0px'}}>
                        <Input prefix={<Icon type="mail" />} placeholder="EMAIL" />
                    </Row>                  
                    <Row style={{padding: '10px 0px 10px 0px'}}>
                        <Input prefix={<Icon type="lock" />} placeholder="PASSWORD" />
                    </Row>
                    <Row style={{padding: '10px 0px 10px 0px'}}> 
                        <Input prefix={<Icon type="lock" />} placeholder=" RETYPE PASSWORD" />
                    </Row>
                    <Row style={{padding: '50px 0px 10px 0px', textAlign: 'left'}}>
                        <Checkbox style={TERMS_AND_COND}>I accept the terms & conditions</Checkbox>
                    </Row>
                    <Row style={{padding: '5px 0px 5px 0px'}}>
                        <Button type="primary" style={SIGNUP}>
                            Signup
                        </Button>
                    </Row>
                    <Row>
                        <h2 style={LOGIN}> or Login with your account! </h2>                
                    </Row>
                </Col>
            </div>

            // need to make terms and conditions a button
            // login with your account needs to be centered
            // need correct coinage logo
            // need proper input with box separating the icon
            // need correct icon for password check
            // need hover tag for password
        )
=======
                <Row>
                    <h2 style={COINAGE_TITLE}> <Icon type="copyright" /> Coinage </h2>
                </Row>
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <Row style={{padding: '10px 0px 10px 0px'}}>
                        <h2 style={SIGNUP_TITLE}>SIGNUP</h2>
                    </Row>
                    <Row style={{padding: '20px 0px 10px 0px'}}>
                        <Input prefix={<Icon type="user"  />} placeholder="USERNAME" />
                    </Row>
                    <Row style={{padding: '10px 0px 10px 0px'}}>
                        <Input prefix={<Icon type="mail" />} placeholder="EMAIL" />
                    </Row>
                    <Row style={{padding: '10px 0px 10px 0px'}}>
                        <Input prefix={<Icon type="lock" />} placeholder="PASSWORD" />
                    </Row>
                    <Row style={{padding: '10px 0px 20px 0px'}}>
                        <Input prefix={<Icon type="lock" />} placeholder="RETYPE PASSWORD" />
                    </Row>
                    <Row style={{padding: '50px 0px 5px 0px'}}>
                        <Col span={1}>
                            <Checkbox></Checkbox>
                        </Col>
                        <Col span={8}>
                            <h2 style={TERMS_AND_COND}>I accept the terms & conditions </h2>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Button type="primary" style={SIGNUP_BUTTON}>
                            SIGN UP
                        </Button>
                    </Row>
                    <Row style={{padding: '5px 0px 5px 0px'}}>
                        <h2 style={LOGIN_LINK}>or Login with your account!</h2>
                    </Row>                
                </Col>
                
            

         
            </div>

            // need to add link to terms and conditions and login
            // need to fix input to match actual with vertical line right of icon
            // need username and password check with server
        )

>>>>>>> refs/remotes/origin/dashboard
    }


}

export default RegisterForm;