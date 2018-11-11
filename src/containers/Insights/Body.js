import React from 'react';
import Insights from '../Insights/Insights';
import {BODY_TITLE, GRAPH, BODY_TEXT, CATEGORY_VALUE} from '../Insights/BodyStyle';
import { Form, Icon, Input, Button, Row, Col} from 'antd';

class Body extends React.Component {
    render(){
        return(
            <div>
                <Row style={{padding: '0px 0px 30px 0px'}}>
                    <Col span={1}>
                    </Col>
                    <Col span={6}>
                        <h2 style={BODY_TITLE}>Insights</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={1}>
                    </Col>
                    <Col span={15}>                
                        <div style={GRAPH}>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={1}>
                    </Col>
                    <Col span={8}>
                        <h2 style={BODY_TEXT}>MOST SPENT THESE PAST 6 MONTHS</h2>
                    </Col>
                    <Col span={8}>
                        <h2 style={BODY_TEXT}>TOTAL SAVINGS</h2>
                    </Col>  
                </Row>
                <Row>
                    <Col span={1}>
                    </Col>
                    <Col span={2}>
                        <h2 style={{CATEGORY_VALUE, color: '#F82279'}}>1112</h2>
                    </Col>
                    <Col span={2}>
                        <h2 style={{CATEGORY_VALUE, color: '#FD9722'}}>900</h2>
                    </Col>
                    <Col span={2}>
                    <h2 style={{CATEGORY_VALUE, color: '#5189DC'}}>600</h2>
                    </Col>
                    <Col span={2}>

                    </Col>
                    <Col span={2}>
                        <h2 style={{CATEGORY_VALUE, color: '#F82279'}}>1112</h2>
                    </Col>
                    <Col span={2}>
                        <h2 style={{CATEGORY_VALUE, color: '#FD9722'}}>900</h2>
                    </Col>
                    <Col span={2}>
                        <h2 style={{CATEGORY_VALUE, color: '#5189DC'}}>600</h2>
                    </Col> 
                </Row>
          
            
            </div>
        )
    }

}

export default Body;


