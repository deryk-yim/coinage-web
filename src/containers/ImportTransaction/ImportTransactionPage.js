import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Table, Icon } from 'antd';
import '../Transaction/Transaction.css';
import CsvParse from '@vtex/react-csv-parse';
import {showImportRecords} from '../ImportTransaction/ImportTransaction';
import { METHODS } from 'http';

const importEndpoint = 'http://localhost:3000/import/5aa43585955a2561e0935cdb';

const columns = [
    { title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' }
];

const importColumns = [
    { title: 'Import Date', dataIndex: 'createdDate', key: 'createdDate' },
    { title: 'File Name', dataIndex: 'importFileName', key: 'importFileName' },
    { title: 'Records Added', dataIndex: 'recordsAdded', key: 'recordsAdded' },
    { title: 'Errors and Alerts', dataIndex: 'errorImport', key: 'errorName' }
]

const Validator = require('jsonschema').Validator;
const Json2csvParser = require('json2csv').Parser;
const fields = ['Transaction Date', 'Category', 'Description', 'Amount'];
const moment = require('moment');

class ImportTransactionPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRows: [],
            selectedRowKeys: [],
            data: [],
            toDelete: []
        };
    }
   
    backToTransactionComponent = () => {
        this.props.history.push('/transaction');
    }
   
    componentWillMount() {
        showImportRecords(importEndpoint);
    }

    handleData = (data) => {
        this.setState({
            uploadData: data
        }, this.updateTempData);
    }

    updateTempData = () => {
        const newData = this.state.data;
        this.state.uploadData.forEach(element => {
            newData.push(element);
        });
        this.setState({
            data: newData
        });
    }

    onImport = () => {
        if(document.getElementById("dataInput").value != "") {

        }
    }











    

    

    

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
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
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        return (
            <div>
                <p> <a onClick={this.backToTransactionComponent}>Transactions </a> > Import Transactions </p>
                <h1>Import Transactions </h1>
                <Button onClick={this.onImportClick}>
                    <Icon type="upload" /> Import
                </Button>
                <Button onClick={this.onDeleteRecord} disabled={!hasSelected}>
                    <Icon type="delete" /> Delete
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                

                <CsvParse keys={keys} onDataUploaded={this.handleData}
                    render={
                        onChange => <input
                            type="file" id="dataInput"
                            onChange={onChange}
                        />}>
                </CsvParse>
                {this.state.data.length > 0 ? (<Table rowSelection={rowSelection} dataSource={this.state.data} columns={columns} />) : (<Table dataSource={this.state.importRecords} columns={importColumns} />)}

            </div>
        )
    }
}

export default withRouter(ImportTransactionPage);

/*
const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
        categories: state.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTransactionsData: (url) => dispatch(transactionsFetchData(url)),
        fetchCategories: (url) => dispatch(categoriesFetchData(url)),
        deleteIds: (ids) => dispatch(removeTransactions(ids))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);


*/