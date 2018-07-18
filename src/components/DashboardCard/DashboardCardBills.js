import React from 'react';
import Dashboard from '../../containers/Dashboard/Dashboard';
import {DASHBOARD_CARD_BILLS, DASHBOARD_CARD_TITLE, DASHBOARD_CARD_DAY_COUNTER, DASHBOARD_CIRCLE, DASHBOARD_CARD_DROPDOWN} from '../DashboardCard/DashboardCardStyle';
import { Form, Icon, Input, Button, Layout } from 'antd';


const { Header, Footer, Sider, Content } = Layout;

class DashboardCardBills extends React.Component {
    render() {
        return(
            <div style={DASHBOARD_CARD_BILLS}>
                <Layout>
                   <Header style={DASHBOARD_CARD_DROPDOWN}> <Icon type="down" /> </Header>
                    <div style={{textAlign: 'center', padding: '10px 0 40px 0'}}>
                        <Content style={DASHBOARD_CIRCLE}>600</Content>

                    </div>
                    <Content style={DASHBOARD_CARD_TITLE}> Bills </Content>
                    <Footer style={DASHBOARD_CARD_DAY_COUNTER}> In the Past 30 Days </Footer>
                </Layout>
            </div>
        )
    }
}

export default DashboardCardBills; 