import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox} from 'antd';
import { CONTAINER, COINAGE_TITLE, SIGNUP_TITLE, SIGNUP_BUTTON, LOGIN_LINK, TERMS_AND_COND } from '../RegisterForm/RegisterFormStyle.js';
import { Grid, Row, Col } from '../../components/Grid/Grid'; 


class RegisterForm extends Component {
    render() {
        return (
            <div style={CONTAINER}>
                {/*<Row>
                    <h2 style={COINAGE_TITLE}> <Icon type="copyright" /> Coinage </h2>
                </Row>
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <Row style={{padding: '30px 0px 10px 0px'}}>
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
                        <Col span={12}>
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
                </Col> */}
                
                <Grid>
                    <Row style={{justifyContent: 'flex-start'}}>

                        <Col size={{xs: 12, sm: 6}}>
                            <h2 style={COINAGE_TITLE}> <Icon type="copyright" /> Coinage </h2>
                        </Col>                      
                    </Row>
                    <Row style={{justifyContent: 'center'}}>
                    <Col size={{xs: 12, sm: 4}}>
                        <Row > 
                            <h2 style={SIGNUP_TITLE}>SIGNUP</h2>
                        </Row>
                        <Row >
                            <Input prefix={<Icon type="user"  />} placeholder="USERNAME" />
                        </Row>
                        <Row >
                            <Input prefix={<Icon type="mail" />} placeholder="EMAIL" />
                        </Row>
                        <Row >
                            <Input prefix={<Icon type="lock" />} placeholder="PASSWORD" />
                        </Row>
                        <Row >
                            <Input prefix={<Icon type="lock" />} placeholder="RETYPE PASSWORD" />
                        </Row>
                        <Row >
                            <Col size={{xs:12}} style={{display:'flex'}}>
                                <Checkbox></Checkbox>                                
                                <h2 style={TERMS_AND_COND}>I accept the terms & conditions </h2>
                            </Col>
                        </Row>
                        <Row >
                            <Button type="primary" style={SIGNUP_BUTTON}>
                                SIGN UP
                            </Button>
                        </Row>
                        <Row >
                            <h2 style={LOGIN_LINK}>or Login with your account!</h2>
                        </Row> 
                    </Col>
                    </Row>

                </Grid>

         
            </div>

            // need to add link to terms and conditions and login
            // need to fix input to match actual with vertical line right of icon
            // need username and password check with server
        )

    }


}

export default RegisterForm;