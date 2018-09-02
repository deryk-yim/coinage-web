import React from 'react';
import Profile from '../Profile/Profile';
import {BODY_TITLE, PROFILE_SETTING, SWITCH} from '../Profile/BodyStyle';
import { Form, Icon, Input, Button, Row, Col, Switch} from 'antd';


class Body extends React.Component {
    render(){
        return(
            <div>
                <Row style={{padding: '0px 0px 30px 0px'}}>
                    <Col span={1}>
                    </Col>
                    <Col span={6}>
                        <h2 style={BODY_TITLE}>Profile</h2>
                    </Col>
                </Row>
                <Row style={{padding: '10px 0px 10px 0px'}}>
                    <Col span={1}>
                    </Col>
                    <Col span={6}>
                        <Input prefix={<Icon type="user"  />} placeholder="USERNAME" />
                    </Col>
                    <Col span={6}>
                        <Input prefix={<Icon type="mail" />} placeholder="EMAIL" />
                    </Col>
                </Row>
                <Row style={{padding: '10px 0px 10px 0px'}}>
                    <Col span={1}>
                    </Col>
                    <Col span={6}>
                    <Input prefix={<Icon type="lock" />} placeholder="PASSWORD" />
                    </Col>
                    <Col span={6}>
                    <Input prefix={<Icon type="lock" />} placeholder="RETYPE PASSWORD" />
                    </Col>
                </Row>
                <Row style={{padding: '20px 0px 15px 0px'}}>
                <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <h2 style={PROFILE_SETTING}>PROFILE SETTING</h2>
                    </Col>
                    <Col span={2}>
                        <Switch style={SWITCH}></Switch>
                    </Col>
                    <Col span={4}>
                        <h2 style={PROFILE_SETTING}>PROFILE SETTING</h2>
                    </Col>
                    <Col span={2}>
                        <Switch style={SWITCH}></Switch>
                    </Col>                    
                </Row>
                <Row style={{padding: '15px 0px 15px 0px'}}>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <h2 style={PROFILE_SETTING}>PROFILE SETTING</h2>
                    </Col>
                    <Col span={2}>
                        <Switch style={SWITCH}></Switch>
                    </Col>
                    <Col span={4}>
                        <h2 style={PROFILE_SETTING}>PROFILE SETTING</h2>
                    </Col>
                    <Col span={2}>
                        <Switch style={SWITCH}></Switch>
                    </Col>                    
                </Row>
                <Row style={{padding: '15px 0px 15px 0px'}}>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <h2 style={PROFILE_SETTING}>PROFILE SETTING</h2>
                    </Col>
                    <Col span={2}>
                        <Switch style={SWITCH}></Switch>
                    </Col>
                    <Col span={4}>
                        <h2 style={PROFILE_SETTING}>PROFILE SETTING</h2>
                    </Col>
                    <Col span={2}>
                        <Switch style={SWITCH}></Switch>
                    </Col>    
                </Row>
  
                      
            </div>
        )
    }

}

export default Body;

