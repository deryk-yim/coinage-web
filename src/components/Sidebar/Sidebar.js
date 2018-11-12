import React from 'react';
import { Icon, Button } from 'antd';

import '../Sidebar/Sidebar.css';
import { CONTAINER, SIDEBAR_TITLE, SIDEBAR_BUTTON} from '../Sidebar/SidebarStyle.js';

class Sidebar extends React.Component {
    render() {
        
        return(
            <div style={CONTAINER}>
                <h2 style={SIDEBAR_TITLE}> <Icon type="copyright" /> Coinage </h2>
                <Button type="primary" style={SIDEBAR_BUTTON}> <Icon type="dashboard" />Dashboard</Button>
                <Button type="primary" style={SIDEBAR_BUTTON}> <Icon type="profile" />Bills</Button>
                <Button type="primary" style={SIDEBAR_BUTTON}> <Icon type="line-chart" />Transactions</Button>
                <Button type="primary" style={SIDEBAR_BUTTON}> <Icon type="eye" />Insight</Button>
                <Button type="primary" style={SIDEBAR_BUTTON}> <Icon type="setting" />Settings</Button>
            </div>
        )
    }
}
export default Sidebar;

