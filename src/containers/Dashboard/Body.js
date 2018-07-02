import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import {BODY_TITLE} from '../Dashboard/BodyStyle';
import DashboardCard from '../../components/DashboardCard/DashboardCard'
import { Form, Icon, Input, Button, Row, Col} from 'antd';

class Body extends React.Component {
    render(){
        return(
            <div>
            <h2 style={BODY_TITLE}>Dashboard</h2>
            <DashboardCard/>
            </div>
        )
    }

}

export default Body

