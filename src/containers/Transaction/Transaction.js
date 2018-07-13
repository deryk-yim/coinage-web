import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Table, Icon } from 'antd';
import '../Transaction/Transaction.css';
import AddTransactionPage from '../AddTransaction/AddTransactionPage';

const Validator = require('jsonschema').Validator;
const Json2csvParser = require('json2csv').Parser;
const fields = ['Transaction Date', 'Category', 'Description', 'Amount'];
const moment = require('moment');

const columns = [
    { title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' }
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
            selectedRowKeys: [],
            categories: []
        };
    }

    onDeleteRecord = () => {
        const dataSet = [...this.state.data];
        const removeSet = [...this.state.selectedRowKeys];
        for (var j = 0; j < removeSet.length > 0; j++) {
            const index = removeSet.indexOf(j);
            dataSet.splice(index, 1);
        }
        this.setState({
            data: dataSet,
            selectedRowKeys: []
        })

        const endpoint = 'http://localhost:3000/transaction/delete/5aa43585955a2561e0935cdb';

        for (let i = 0; i < this.state.selectedRows.length > 0; i++) {
            const endpointDelete = endpoint + '/' + this.state.selectedRows[i]._id;
            fetch(endpointDelete, {
                method: 'delete'
            })
                .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        return res.json();
                    }
                    else {
                        throw new Error('Try Again Later');
                    }
                })
                .catch((err => {
                    error: err
                }))
        }
    }

    componentDidMount() {
        this.getCategories();

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
                console.log(jsonData[0].category['name']);

                for (let i = 0; i < jsonData.length; i++) {
                    jsonData[i].amount = parseFloat(jsonData[i].amount).toFixed(2);
                    jsonData[i].transactionDate = moment(new Date(jsonData[i].transactionDate)).utc().format('MMM DD, YYYY');
                    jsonData[i].category = jsonData[i].category['name'];




                }
                return jsonData;
            })
            .then(jsonData => {
                this.setState({
                    data: jsonData,
                    response: true
                })
            })
            .catch((err) => {
                console.log('handled the error');
              });
    }

    getCategories = () => {
        const categoryEndpoint = 'http://localhost:3000/category/5aa43585955a2561e0935cdb';
        fetch(categoryEndpoint, {
            method: 'get'
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                }
                else {
                    throw new Error('Try Again Later');
                }
            })
            .then(categoryData => {
                console.log(categoryData);
                return categoryData;
            })
            .then(categoryData => {
                this.setState({
                    categories: categoryData
                })
            })
            .catch((err) => {
                console.log('handled the error');
              });
    }
    
    addRecordToState = (newRecord) => {
        alert('gets hit');
        const dataSet = [...this.state.data];

        dataSet.push(newRecord);

        this.setState({
            data: dataSet
        })

    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
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

        const { selectedRowKeys } = this.state;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        const hasRecords = this.state.data.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        // passs down categories array to AddTransactionPage then AddTransactionPage down to AddTransactionForm

        return (
            <div>
                <AddTransactionPage categories = {this.state.categories} addRecordToState={this.addRecordToState}
                />
                <Button onClick={this.onImportClick}>
                    <Icon type="upload" /> Import
                </Button>
                <Button onClick={this.onExportClick} disabled={!hasRecords}>
                    <Icon type="download" />Export
                </Button>

                <Button onClick={this.onDeleteRecord} disabled={!hasSelected}>
                    <Icon type="delete" /> Delete
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Table rowSelection={rowSelection} dataSource={this.state.data} columns={columns} />
            </div>
        )
    }
}

export default withRouter(Transaction);