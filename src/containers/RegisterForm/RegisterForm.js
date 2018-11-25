import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Icon, Input, Button, Checkbox } from 'antd';
import { CONTAINER, COINAGE_TITLE, SIGNUP_TITLE, SIGNUP_BUTTON, LOGIN_LINK, TERMS_AND_COND } from '../RegisterForm/RegisterFormStyle.js';
import { Grid, Row, Col } from '../../components/Grid/Grid';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }
    onLogin = () => {
        this.setState({
            redirect: true,
        });
    }
    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div style={CONTAINER}>

                <Grid>
                    <Row left>

                        <Col size={{ xs: 12, sm: 6 }}>
                            <h2 style={COINAGE_TITLE}> <Icon type="copyright" /> Koinij </h2>
                        </Col>
                    </Row>
                </Grid>
                <Grid center>

                    <Row center style={{ paddingTop: '5vh' }}>
                        <Col size={{ xs: 12, sm: 4 }}>
                            <Row >
                                <h2 style={SIGNUP_TITLE}>SIGNUP</h2>
                            </Row>
                            <Row >
                                <Input prefix={<Icon type="user" />} placeholder="USERNAME" />
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
                                <Col size={{ xs: 12 }} style={{ display: 'flex' }}>
                                    <Checkbox />
                                    <h2 style={TERMS_AND_COND}>I accept the terms & conditions </h2>
                                </Col>
                            </Row>
                            <Row >
                                <Button type="primary" style={SIGNUP_BUTTON}>
                                    SIGN UP
                                </Button>
                            </Row>
                            <Row center>
                                <Button onClick={this.onLogin} style={LOGIN_LINK}>
                                    or Login with your account!
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
            // need to add link to terms and conditions and login
            // need to fix input to match actual with vertical line right of icon
            // need username and password check with server
        );
    }
}
