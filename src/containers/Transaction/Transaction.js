import React from 'react';
import { Button, Table, Icon, Spin, Form, Select, Input, InputNumber, Popconfirm } from 'antd';
import '../Transaction/Transaction.css';
import { connect } from 'react-redux';
import { transactionsFetchData } from '../../actions/actionTransaction';
import { categoriesFetchData } from '../../actions/actionCategory';
import { deleteTransactionFromServer } from '../DeleteTransaction/DeleteTransaction';
import { removeTransactions } from '../../actions/actionDeleteTransaction';
import EditableTransactionTable from '../Transaction/EditableTransactionTable';


const getTransactionsEndpoint = 'http://localhost:3000/transaction/5aa43585955a2561e0935cdb/';
const getTransactionCount = 'http://localhost:3000/transaction/count/1/5aa43585955a2561e0935cdb';
const getCategoriesEndpoint = 'http://localhost:3000/category/5aa43585955a2561e0935cdb';
const deleteTransactionsEndpoint = 'http://localhost:3000/transaction/delete/5aa43585955a2561e0935cdb';
const deleteList = [];
const deleteNoIdList = [];
const moment = require('moment');

class Transaction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRows: [],
            selectedRowKeys: [],
            toDelete: [],
            uploadData: {},
            data: [],
            importRecords: [],
            count: 0
        };
    }

    getTransactionsByPage(url, page) {
        fetch(url + page, {
            method: 'post'
        })
            .then(res => {
                console.log(url + page);
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                }
                else {
                    throw new Error('Try Again Later');
                }
            })
            .then(jsonData => {
                for (let i = 0; i < jsonData.length; i++) {
                    jsonData[i].amount = parseFloat(jsonData[i].amount).toFixed(2);
                    jsonData[i].transactionDate = moment(new Date(jsonData[i].transactionDate)).format('MMM DD, YYYY');
                    jsonData[i].category = jsonData[i].category['name'];
                }
                return jsonData
            })
            .then(jsonData => {
                this.setState({
                    data: jsonData
                });
            });
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        deleteList.length = 0;
        deleteNoIdList.length = 0;

        for (let i = 0; i < selectedRows.length; i++) {
            if (selectedRows[i].hasOwnProperty('_id')) {
                deleteList.push(selectedRows[i]['_id']);
            }
        }

        for (let i = 0; i < selectedRows.length; i++) {
            if (!selectedRows[i].hasOwnProperty('_id')) {
                deleteNoIdList.push(selectedRows[i]);
            }
        }

        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows,
            toDelete: deleteList
        });
    }

    onDeleteRecord = () => {
        for (let i = 0; i < this.state.selectedRows.length; i++) {
            if (this.state.selectedRows[i].hasOwnProperty('_id')) {
                this.props.deleteIds(this.state.selectedRows[i]['_id']); // deletes the record from the redux store
            }
        }
        if (deleteList.length > 0) {
            deleteTransactionFromServer(deleteTransactionsEndpoint, this.state.selectedRows);
        }
        this.setState({
            selectedRows: [],
            selectedRowKeys: []
        })
    }

    onImportClick = () => {
        this.props.history.push('/transaction/import');
    }
    onExportClick = () => {
        this.props.history.push('/transaction/export');

    }

    componentDidMount() {
        this.props.fetchCategories(getCategoriesEndpoint);
        // week endpoint grab everything from the week and update
        this.getTransactionsByPage(getTransactionsEndpoint, 1);
        this.countTransactions(getTransactionCount);
        console.log("Total Transactions: " + this.countTransactions(getTransactionCount));
    }

    onChange = (e) => {
        this.getTransactionsByPage(getTransactionsEndpoint, e);
        //check based on filter

    }

    countTransactions(endpoint) {
        fetch(endpoint, {
            method: 'POST',
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
                this.setState({
                    count: jsonData.data
                })
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success: ', response))
    };

    handleChange(value) {
        if (value === 'Past Week') {

        }
        else if (value === 'Past 30 Days') {

        }
        else if (value === 'Past 60 Days') {

        }
        else if (value === 'Custom Dates') {

        }
    }

    handleAdd = () => {
        const { 
            count, 
            dataSource } = this.state;
        const newData = {
          key: count,
          name: `Edward King ${count}`,
          age: 32,
          address: `London, Park Lane no. ${count}`,
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
      }

    render() {
        const keys = [
            "transactionDate",
            "category",
            "description",
            "amount"
        ];

        let {
            sortedInfo
        } = this.state;

        sortedInfo = sortedInfo || {};

        const { selectedRowKeys } = this.state;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        const hasRecords = true;


        const Option = Select.Option;

        const optionItems = this.props.categories.map((item) =>
            <Option value={item['_id']}>{item['name']}</Option>
        );

        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
                </Button>
                <Select defaultValue="Past Week" style={{ width: 140 }} onChange={this.handleChange}>
                    <Option value="Past Week">Past Week</Option>
                    <Option value="Past 30 Days">Past 30 Days</Option>
                    <Option value="Past 60 Days">Past 60 Days</Option>
                    <Option value="Custom Dates">Custom Dates</Option>
                    <Option value="All Dates">Custom Dates</Option>
                </Select>

                <Select
                    mode="tags"
                    size="default"
                    placeholder="All Categories"
                    style={{ width: '50%' }}
                >
                    {optionItems}
                </Select>

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
                <Spin spinning={!hasRecords} />
                <EditableTransactionTable data={this.state.data}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTransactionsData: (url, page) => dispatch(transactionsFetchData(url, page)),
        fetchCategories: (url) => dispatch(categoriesFetchData(url)),
        deleteIds: (ids) => dispatch(removeTransactions(ids)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);