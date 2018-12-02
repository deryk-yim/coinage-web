import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'

import { Icon, Input, Button} from 'antd';
import { CONTAINER, COINAGE_TITLE, LOGIN_LINK, FORGOT_PASSWORD_TITLE, SUBMIT_BUTTON, ENTER_EMAIL_TITLE} from '../ResetPassword/ResetPasswordStyle.js';
import { Grid, Row, Col } from '../../components/Grid/Grid'; 

class ResetPassword extends Component {

    state = {
        redirect: false
    }

    onLogin = () => {
        this.setState({
            redirect: true
        })
    }
    
    render() {
        const { redirect } = this.state;
        if(redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <div style={CONTAINER}>
                <Grid>
                    <Row left>
                    <Col size={{xs: 12, sm: 6}}>
                        <h2 style={COINAGE_TITLE}> <Icon type="copyright" /> Koinij </h2>
                    </Col>                      
                    </Row> 
                </Grid>               
                <Grid center>

                    <Row center style={{paddingTop: '5vh'}}>
                        <Col size={{xs: 12, sm: 4}}>
                            <Row > 
                                <h2 style={FORGOT_PASSWORD_TITLE}>FORGOT PASSWORD</h2> 
                            </Row>
                            <Row > 
                                <h3 style={ENTER_EMAIL_TITLE}>Enter your Email</h3> 
                            </Row>
                            <Row >
                                <Input prefix={<Icon type="mail" />} placeholder="EMAIL" />
                            </Row>
                            <Row >
                                <Button type="primary" style={SUBMIT_BUTTON}>
                                    SUBMIT
                                </Button>
                            </Row>
                            <Row center>
                                <Button onClick={this.onLogin} style={LOGIN_LINK}>or Login with your account!</Button>
                            </Row> 
                        </Col>
                    </Row>
                </Grid>
            </div>
        )

    }

}

export default ResetPassword;