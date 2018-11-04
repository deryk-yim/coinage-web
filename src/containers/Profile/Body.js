import React from 'react';
import Profile from '../Profile/Profile';
import {BODY_TITLE, PROFILE_SETTING, SWITCH} from '../Profile/BodyStyle';
// import { Form, Icon, Input, Button, Row, Col, Switch} from 'antd';
import { Form, Icon, Input, Button, Switch } from 'antd';
import { Grid, Row, Col }  from '../../components/Grid/Grid';

class Body extends React.Component {
    render(){
        return(
            <div>
                {/* <Row style={{padding: '0px 0px 30px 0px'}}>
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
                </Row> */}

                <Grid>
                    <Row>
                        <Col size={{xs: 12, sm: 6}}>
                            <Input prefix={<Icon type="user" />} placeholder="USERNAME" />
                        </Col>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Input prefix={<Icon type="mail" />} placeholder="EMAIL" />
                        </Col>
                    </Row>
                    <Row>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Input prefix={<Icon type="user" />} placeholder="PASSWORD" />
                        </Col>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Input prefix={<Icon type="mail" />} placeholder="RETYPE PASSWORD" />
                        </Col>
                    </Row>
                    <Row>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                            <Col><Switch style={SWITCH}></Switch></Col>
                        </Col>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                            <Col><Switch style={SWITCH}></Switch></Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                            <Col><Switch style={SWITCH}></Switch></Col>
                        </Col>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                            <Col><Switch style={SWITCH}></Switch></Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                            <Col><Switch style={SWITCH}></Switch></Col>
                        </Col>
                        <Col size={{ xs: 12, sm: 6 }}>
                            <Col>
                                <h2 style={PROFILE_SETTING}>PROFILE SETTING</h2>
                            </Col>
                            <Col>
                                <Switch style={SWITCH}></Switch>
                            </Col>
                        </Col>
                    </Row>


                    <Row>
                        <Col 
                            nopadding
                            size={{xs: 3, sm: 6, md: 9, lg: 9, xl: 9}}
                            style={{ backgroundColor: 'red', color: 'white', height: '50px'}}
                            order={{xs: 2, md: 1}}>
                            1   
                        </Col>
                        <Col 
                            size={{ xs: 9, sm: 6, md: 3 }}
                            style={{ backgroundColor: 'green', color: 'white', height: '50px' }}
                            order={{ xs: 1, md: 2 }}>
                            2
                        </Col>
                   </Row>
                   <Row>
                        <Col 
                            size={{ xs: 4, sm: 6, md: 8 }}
                            style={{ backgroundColor: 'orange', color: 'white', height: '50px' }}
                            offset={{ xs: 0, sm: 2, md: 4 }}>
                            3
                       </Col>
                   </Row>
                </Grid>
            </div>
        )
    }

}

export default Body;

