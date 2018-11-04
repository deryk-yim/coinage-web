import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import {BODY_TITLE} from '../Dashboard/BodyStyle';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import DashboardCardBills from '../../components/DashboardCard/DashboardCardBills';
import DashboardCardInsights from '../../components/DashboardCard/DashboardCardInsights';
import { Form, Icon, Input, Button, Row, Col} from 'antd';


class Body extends React.Component {
    render(){
        return(
            <div>
                <Row style={{padding: '0px 0px 30px 0px'}}>
                   <Col span={1}>
                   </Col>
                   <Col span={6}>
                   <h2 style={BODY_TITLE}>Dashboard</h2>
                   </Col>
                </Row>
                <Row>
                    <Col span={1}> 
                    </Col>
                    <Col span={6}>
                        <DashboardCard/>
                    </Col>
                    <Col span={6}>
                        <DashboardCardBills/>    
                    </Col>
                    <Col span={6}>
                    <DashboardCardInsights/>    
                    </Col>
                </Row>
          
            
            </div>
        )
    }

}

export default Body;

