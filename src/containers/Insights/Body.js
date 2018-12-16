import React from 'react';
import { BODY_TITLE, GRAPH, BODY_TEXT, CATEGORY_VALUE, CATEGORY, CONTAINER } from '../Insights/BodyStyle';
import { Grid, Row, Col } from '../../components/Grid/Grid';

const Body = () => (
    <div style={CONTAINER}>
        <Grid>
            <Row style={{ justifyContent: 'flex-start' }}>
                <Col size={{ xs: 12, sm: 6 }}>
                    <h2 style={BODY_TITLE}>Insights</h2>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'flex-start' }}>
                <div style={GRAPH} />
            </Row>
            <Row style={{ justifyContent: 'flex-start' }}>
                <Col size={{ xs: 12, sm: 6 }}>
                    <h2 style={BODY_TEXT}>MOST SPENT THESE PAST 6 MONTHS</h2>
                </Col>
                <Col size={{ xs: 12, sm: 6 }}>
                    <h2 style={BODY_TEXT}>TOTAL SAVINGS</h2>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'flex-start' }}>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#F82279' }}>1112</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#FD9722' }}>900</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#5189DC' }}>600</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#F82279' }}>1112</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#FD9722' }}>900</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#5189DC' }}>600</h2>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'flex-start' }}>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Food</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Education</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Transportation</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Food</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Transportation</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Education</h2>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'flex-start' }}>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#F721F7' }}>1112</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#DBD650' }}>900</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#12D521' }}>600</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#F721F7' }}>1112</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#DBD650' }}>900</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={{ CATEGORY_VALUE, color: '#12D521' }}>600</h2>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'flex-start' }}>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Food</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Education</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Transportation</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Food</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Transportation</h2>
                </Col>
                <Col size={{ xs: 4, sm: 2 }}>
                    <h2 style={CATEGORY}>Education</h2>
                </Col>
            </Row>
        </Grid>
    </div>
);

export default Body;
