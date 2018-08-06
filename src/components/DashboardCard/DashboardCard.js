import React from 'react';
import Dashboard from '../../containers/Dashboard/Dashboard';
import {DASHBOARD_CARD, DASHBOARD_CARD_TITLE, DASHBOARD_CARD_DAY_COUNTER, DASHBOARD_CIRCLE, DASHBOARD_CARD_DROPDOWN, DASHBOARD_CARD_DROPDOWN_HEADER} from '../DashboardCard/DashboardCardStyle';
import { Form, Icon, Input, Button, Layout } from 'antd';


const { Header, Footer, Sider, Content } = Layout;

class DashboardCard extends React.Component {
    render() {
        return(
            <div style={DASHBOARD_CARD}>
                <Layout>
                    <Header style={DASHBOARD_CARD_DROPDOWN_HEADER}> 
                        <Button style={DASHBOARD_CARD_DROPDOWN}><Icon type="down" /> </Button> 
                    </Header>
                    <div style={{textAlign: 'center', padding: '10px 0 40px 0'}}>
                        <Content style={DASHBOARD_CIRCLE}>600</Content>

                    </div>
                    <Content style={DASHBOARD_CARD_TITLE}> Transaction </Content>
                    <Footer style={DASHBOARD_CARD_DAY_COUNTER}> In the Past 30 Days </Footer>
                </Layout>
            </div>
        )
    }
}

export default DashboardCard; 