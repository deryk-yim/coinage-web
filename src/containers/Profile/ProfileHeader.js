import React from 'react';
import Profile from '../Profile/Profile';
import {CONTAINER, HEADER_BUTTON} from './ProfileHeaderStyle';
import { Form, Icon, Input, Button} from 'antd';
import { Grid, Row, Col } from '../../components/Grid/Grid'; 
class CustomHeader extends React.Component {
    render(){
        return(
            <div className="header-custom" style={CONTAINER}>
                {/*<Col span={1}></Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Transaction</Button>
                </Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Bill</Button>
                </Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="plus-circle-o" /> Add Category</Button>
                </Col>
                <Col span={7}></Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="search" /> Search</Button>
                </Col>
                <Col span={3}>
                    <Button style={HEADER_BUTTON}><Icon type="user" /> Profile</Button>
                </Col>
                <Col span={1}></Col>*/}

                <Grid>
                    <Row >
                        <Col size={{xs: 12, sm:6}} style={{padding: '0px 10px'}}>
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

     
                        <Col size={{xs: 12, sm:6}} style={{padding: '0px 10px', textAlign: 'right'}}>
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
        )
    }
}

export default CustomHeader;