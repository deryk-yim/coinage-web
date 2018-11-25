import React from 'react';
import { Icon, Button } from 'antd';
import { CONTAINER, HEADER_BUTTON } from './ProfileHeaderStyle';
import { Grid, Row, Col } from '../../components/Grid/Grid';

const ProfileHeader = () => (
    <div className="header-custom" style={CONTAINER}>
        <Grid>
            <Row >
                <Col size={{ xs: 12, sm: 6 }} style={{ padding: '0px 10px' }}>
                    <Col>
                        <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> New Bill</Button>
                    </Col>
                    <Col>
                        <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Import</Button>
                    </Col>
                    <Col>
                        <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Export</Button>
                    </Col>
                </Col>
                <Col size={{ xs: 12, sm: 6 }} style={{ padding: '0px 10px', textAlign: 'right' }}>
                    <Col>
                        <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Search</Button>
                    </Col>
                    <Col>
                        <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Profile</Button>
                    </Col>
                </Col>
            </Row>
        </Grid>
        {/* <Button style={HEADER_BUTTON}>Test</Button>
        <Button style={HEADER_BUTTON}>Test</Button>
        <Button style={HEADER_BUTTON}>Test</Button> */}
    </div>
);

export default ProfileHeader;
