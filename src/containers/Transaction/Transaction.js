import React from 'react';
import { withRouter} from 'react-router-dom';
import { Button, Table, Icon } from 'antd';
import '../Transaction/Transaction.css';
import AddTransactionPage from '../AddTransaction/AddTransactionPage';

const Validator = require('jsonschema').Validator;
const Json2csvParser = require('json2csv').Parser;
const fields = ['Transaction Date', 'Category', 'Description', 'Amount'];
const moment = require('moment');

const columns = [
    {title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate'},
    {title: 'Category', dataIndex: 'category', key: 'category'}, 
    {title: 'Description', dataIndex: 'description', key: 'description'},
    {title: 'Amount', dataIndex: 'amount', key: 'amount'}
];


class Transaction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenAddTrans: false,
            isOpenEditTrans: false,
            response: false,
            data: [],
            selectedRows: [],
            selectedRowKeys: []
        };
    }

    
    
    
    onDeleteRecord = () => {
        
        const dataSet = [...this.state.data];
        const remove = [...this.state.selectedRowKeys];
        for(var j = 0; j < remove.length > 0; j++) {
            const index = remove.indexOf(j);
            dataSet.splice(index, 1);
            this.setState({
                data: dataSet
            })
        }


        
        const endpoint = 'http://localhost:3000/transaction/delete/5aa43585955a2561e0935cdb';
 
        for(let i = 0; i < this.state.selectedRows.length > 0; i++) {
            const endpointDelete = endpoint + '/' + this.state.selectedRows[i]._id;
            fetch(endpointDelete, {
                method: 'delete'
            })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    alert('it worked!');
                    return res.json();
                }
                else {
                    alert('FAILEDs!');
                    throw new Error('Try Again Later');
                }
            })
            .then(jsonData => {
                console.log(jsonData);
            })

  
                
        }

        
        
      
        
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
                    throw new Error('Try Again Later');
                }
            })
            .then(jsonData => {
                console.log(jsonData);
                for(let i = 0; i < jsonData.length; i++) {
                    jsonData[i].amount = parseFloat(jsonData[i].amount).toFixed(2);
                    jsonData[i].transactionDate = moment(new Date(jsonData[i].transactionDate)).utc().format('MMM DD, YYYY');
                }
                return jsonData;
            })
            .then(jsonData => {

                this.setState({
                    data: jsonData,
                    response: true
                })
            })
    }

    updateTable = () => {
        alert('running updateable Table');
        const endpoint = 'http://localhost:3000/transaction/5aa43585955a2561e0935cdb';
        fetch(endpoint, {
            method: 'post'
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                }
                else {
                    throw new Error('Try Again Later');
                }
            })
            .then(jsonData => {
                console.log(jsonData);
                for(let i = 0; i < jsonData.length; i++) {
                    jsonData[i].amount = parseFloat(jsonData[i].amount).toFixed(2);
                    jsonData[i].transactionDate = moment(new Date(jsonData[i].transactionDate)).utc().format('MMM DD, YYYY');
                }
                return jsonData;
            })
            .then(jsonData => {
                this.setState({
                    data: jsonData,
                    response: true
                })
            })
    }

   onImportClick = () => {
    this.props.history.push('/transaction/import');
   }

   onExportClick = () => {
    this.props.history.push('/transaction/export');
   }

    render() {
        const keys = [
            "transactionDate",
            "category",
            "description",
            "amount"
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              this.setState({
                selectedRows: selectedRows,
                selectedRowKeys: selectedRowKeys
              })
            },
          };
        return (
            <div>
               <AddTransactionPage/>
                <Button onClick={this.onImportClick}>
                    <Icon type="upload" /> Import
                </Button>
                <Button onClick={this.onExportClick}>
                    <Icon type="download" />Export
                </Button>
                <Button onClick={this.onDeleteRecord}>
                    <Icon type="delete" /> Delete
                </Button>
                <Table rowSelection={rowSelection} dataSource={this.state.data} columns={columns} />
            </div>
        )
    }
}

export default withRouter(Transaction);