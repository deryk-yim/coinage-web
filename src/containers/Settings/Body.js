import React from 'react';
import { Icon, Switch, Menu, Dropdown, Checkbox } from 'antd';
import { CONTAINER, BODY_TITLE, PROFILE_SETTING, SWITCH } from '../Settings/BodyStyle';
import { Grid, Row, Col } from '../../components/Grid/Grid';

const Body = () => {
    const currency = (
        <Menu>
            <Menu.Item>
                <a>CAD</a>
            </Menu.Item>
            <Menu.Item>
                <a>US</a>
            </Menu.Item>
            <Menu.Item>
                <a>Devins Stuffed Animals</a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div style={CONTAINER}>
            <Grid>
                <Row style={{ paddingLeft: '2vh' }}>
                    <h2 style={BODY_TITLE}>Settings</h2>
                </Row>
                <Row>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Dropdown overlay={currency} trigger={['click']}>
                            <a className="ant-dropdown-link">
                                Currency <Icon type="down" />
                            </a>
                        </Dropdown>

                    </Col>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Dropdown overlay={currency} trigger={['click']}>
                            <a className="ant-dropdown-link">
                                Notifications <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Dropdown overlay={currency} trigger={['click']}>
                            <a className="ant-dropdown-link">
                                Currency <Icon type="down" />
                            </a>
                        </Dropdown>

                    </Col>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Dropdown overlay={currency} trigger={['click']}>
                            <a className="ant-dropdown-link">
                                Notifications <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Col><h2 style={PROFILE_SETTING}>SETTING 1</h2></Col>
                        <Col><Switch style={SWITCH} /></Col>
                    </Col>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Col><h2 style={PROFILE_SETTING}>SETTING 1</h2></Col>
                        <Col><Switch style={SWITCH} /></Col>
                    </Col>
                </Row>
                <Row>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Col><h2 style={PROFILE_SETTING}>SETTING 1</h2></Col>
                        <Col><Switch style={SWITCH} /></Col>
                    </Col>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Col><h2 style={PROFILE_SETTING}>SETTING 1</h2></Col>
                        <Col><Switch style={SWITCH} /></Col>
                    </Col>
                </Row>
                <Row>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Col><h2 style={PROFILE_SETTING}>SETTING 1</h2></Col>
                        <Col><Switch style={SWITCH} /></Col>
                    </Col>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Col>
                            <h2 style={PROFILE_SETTING}>SETTING 1</h2>
                        </Col>
                        <Col>
                            <Switch style={SWITCH} />
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Col><h2 style={PROFILE_SETTING}>SETTING 2</h2></Col>
                        <Col><Checkbox /></Col>
                    </Col>
                    <Col size={{ xs: 12, sm: 6 }}>
                        <Col><h2 style={PROFILE_SETTING}>SETTING 2</h2></Col>
                        <Col><Checkbox /></Col>
                    </Col>
                </Row>
            </Grid>

        </div>
    );
};

export default Body;
