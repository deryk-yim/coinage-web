import React from 'react';
import Dashboard from '../../containers/Dashboard/Dashboard'
import '../Sidebar/Sidebar.css';
import { CONTAINER, SIDEBAR_TITLE, SIDEBAR_BUTTON} from '../Sidebar/SidebarStyle.js';
import { Form, Icon, Input, Button } from 'antd';
import {Link} from 'react-router-dom';


class Sidebar extends React.Component {


    render() {
        console.log(this.props)
        return(
            <div style={CONTAINER}>
               
                <h2 style={SIDEBAR_TITLE}> <Icon type="copyright" /> Coinage </h2>   
                <Link to="/dashboard" style={SIDEBAR_BUTTON}>
                    <Icon type="dashboard" style={{marginRight: '10px'}} /> 
                        Dashboard
                </Link>
                <Link to="/profile" style={SIDEBAR_BUTTON}>
                    <Icon type="profile" style={{marginRight: '10px'}} />
                        Bills
                </Link>
                <Link to="/transaction" style={SIDEBAR_BUTTON}>
                    <Icon type="line-chart" style={{marginRight: '10px'}} />
                        Transactions
                </Link>
                <Link to="/insight" style={SIDEBAR_BUTTON}>
                    <Icon type="eye" style={{marginRight: '10px'}}/>
                        Insight
                </Link>
                <Link to="/setting" style={SIDEBAR_BUTTON}>
                    <Icon type="setting" style={{marginRight: '10px'}}/>
                        Setting
                </Link>


            
            </div>
        )
    }
}
export default Sidebar;

