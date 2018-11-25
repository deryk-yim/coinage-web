import React from 'react';
import { Icon, Button } from 'antd';
import { Grid, Row, Col } from '../../components/Grid/Grid';
import { CONTAINER, HEADER_BUTTON } from './CustomHeaderStyle';

const CustomHeader = () => (
    <div className="header-custom" style={CONTAINER}>
        <Grid>
            <Row >
                <Col size={{ xs: 12, sm: 3 }}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Transaction</Button>
                </Col>
                <Col size={{ xs: 12, sm: 2 }}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Bill</Button>
                </Col>
                <Col size={{ xs: 12, sm: 2 }}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Category</Button>
                </Col>
                <Col size={{ xs: 12, sm: 2 }}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Category</Button>
                </Col>
            </Row>
        </Grid>
    </div>
);

export default CustomHeader;
