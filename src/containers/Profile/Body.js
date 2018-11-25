import React from 'react';
import { Icon, Input, Switch } from 'antd';
import { BODY_TITLE, PROFILE_SETTING, SWITCH } from '../Profile/BodyStyle';
// import { Form, Icon, Input, Button, Row, Col, Switch} from 'antd';
import { Grid, Row, Col } from '../../components/Grid/Grid';

const Body = () => (
    <div>
        <Grid>
            <Row style={{ paddingLeft: '2vh' }}>
                <h2 style={BODY_TITLE}>Profile</h2>
            </Row>
            <Row>
                <Col size={{ xs: 12, sm: 6 }}>
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
                    <Col><Switch style={SWITCH} /></Col>
                </Col>
                <Col size={{ xs: 12, sm: 6 }}>
                    <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                    <Col><Switch style={SWITCH} /></Col>
                </Col>
            </Row>
            <Row>
                <Col size={{ xs: 12, sm: 6 }}>
                    <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                    <Col><Switch style={SWITCH} /></Col>
                </Col>
                <Col size={{ xs: 12, sm: 6 }}>
                    <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                    <Col><Switch style={SWITCH} /></Col>
                </Col>
            </Row>
            <Row>
                <Col size={{ xs: 12, sm: 6 }}>
                    <Col><h2 style={PROFILE_SETTING}>PROFILE SETTING</h2></Col>
                    <Col><Switch style={SWITCH} /></Col>
                </Col>
                <Col size={{ xs: 12, sm: 6 }}>
                    <Col>
                        <h2 style={PROFILE_SETTING}>PROFILE SETTING</h2>
                    </Col>
                    <Col>
                        <Switch style={SWITCH} />
                    </Col>
                </Col>
            </Row>
        </Grid>
    </div>
);

export default Body;

