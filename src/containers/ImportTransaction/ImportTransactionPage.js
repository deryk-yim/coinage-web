import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Table, Icon } from 'antd';
import '../Transaction/Transaction.css';
import CsvParse from '@vtex/react-csv-parse';
import {showImportRecords, error} from '../ImportTransaction/ImportTransaction';
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
            data: []
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
        if(document.getElementById("dataInput").value == "") {
            error();
        }
        else if(document.getElementById("dataInput").value != "") {
           // create import record

           
        }
    }

    clearAll = () => {
        this.setState({
            data: []
        })
    }
    
    removeSelectedRows = () => {
        const records = [...this.state.data];
        const removeRecords = [...this.state.selectedRows];
        const newSet = records.filter(
            function(e) {
                return this.indexOf(e) < 0;
          }, removeRecords);
          this.setState({
            data: newSet,
            selectedRows: [],
            selectedRowKeys: []
        })
    }

     onSelectChange = (selectedRowKeys, selectedRows, key) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        console.log(selectedRows);
        this.setState({
            selectedRows: selectedRows
        })
         
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
                <Button onClick={this.onImport}>
                    <Icon type="upload" /> Import
                </Button>
                <Button  onClick={this.removeSelectedRows} disabled={!hasSelected}>
                    <Icon type="delete" /> Delete
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Button onClick={this.clearAll} disabled={!hasSelected}>
                     Clear All
                </Button>
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