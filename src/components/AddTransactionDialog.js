import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import AddTransactionForm from './AddTransactionForm';

class AddTransactionDialog extends React.Component {

    handleOk = () => {
        this.props.closeAddTransaction(false);
        // updates the table of transactions
        // calls the server to update the user




    }

    handleCancel = () => {
        this.props.closeAddTransaction(false);    
    }

    render() {
        return (

            <div>

                
                <Modal
                title = "Add a Transaction" 
                visible={this.props.shown} 
                onOk={this.handleOk}
                onCancel={this.handleCancel} 
                > 
                <AddTransactionForm addTransactionToServer = {this.props.addTransactionToServer}/>
                 </Modal>

            </div>

        )
    }

    





}

export default AddTransactionDialog;