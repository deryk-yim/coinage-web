import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import '../Transaction.css';
import AddTransactionDialog from './AddTransactionDialog';
import { getTransactionData } from '../loadTransactionData';


const columns = [
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    }, {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Modified Date',
        dataIndex: 'modifiedDate',
        key: 'modifiedDate',
    }];


class Transaction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenAddTrans: false,
            isOpenEditTrans: false,
            response: false,
            data: []
        };
    }

    componentDidMount() {
        const endpoint = 'http://localhost:3000/transaction/5aa43585955a2561e0935cdb';
        fetch(endpoint, {
            method: 'post'
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                }
                else {
                    throw new Error("Try Again Later");
                }
            })
            .then(jsonData => {
                this.setState({
                    data: jsonData,
                    response: true
                });
                alert((Array.isArray(jsonData)));
            })
    }



    openAddTransaction = () => {
        this.setState({
            isOpenAddTrans: true
        })
    }

    closeAddTransaction = (bool) => {
        this.setState({
            isOpenAddTrans: bool
        })
    }



    openEditTransaction = () => {
        this.setState({
            isOpenEditTrans: true
        })
    }

  
    addTransactionToServer = (transaction) => {
        const endpoint = 'http://localhost:3000/transaction/create/1/5aa43585955a2561e0935cdb';

        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success: ', response))

     };
    
    render() {

        return (

            <div>


                <Button onClick={this.openAddTransaction}> + Add Transaction  </Button>
                <Button > Import </Button>
                <Button > Export </Button>
                <AddTransactionDialog addTransactionToServer={this.addTransactionToServer}
                    openAddTransaction={this.openAddTransaction}
                    closeAddTransaction={this.closeAddTransaction}
                    shown={this.state.isOpenAddTrans}
                />

                <Table dataSource={this.state.data} columns={columns} />
            </div>

        )
    }

}

export default Transaction;