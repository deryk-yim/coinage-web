import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Table, Icon } from 'antd';
import '../Transaction/Transaction.css';
import CsvParse from '@vtex/react-csv-parse';

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

class Import extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadData: {},
            data: [],
            importRecords: []
        };
    }

    handleData = (data) => {
        this.setState({
            uploadData: data
        }, this.updateDateState);
    }

    updateDateState = () => {
        const newData = this.state.data;
        this.state.uploadData.forEach(element => {
            newData.push(element);
        });
        this.setState({
            data: newData
        });
    }

    componentWillMount() {
        const importEndpoint = 'http://localhost:3000/import/5aa43585955a2561e0935cdb';
        fetch(importEndpoint, {
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
            .then(importData => {
                console.log(importData);
                return importData;
            })
            .then(importData => {
                this.setState({
                    importRecords: importData
                })
            })
            .catch((err) => {
                console.log('handled the error');
            });
    }

    addImportToServer = (importRecord) => {
        const endpoint = 'http://localhost:3000/import/create/1/5aa43585955a2561e0935cdb';
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(importRecord),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                res => {
                    if (res.status === 201) {
                        console.log('Success');
                    }
                    return res.json();
                }
            )
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success: ', response))
    };



    addTransactionToServer = (transactions) => {
        const endpoint = 'http://localhost:3000/transaction/create/2/5aa43585955a2561e0935cdb';
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(transactions),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                res => {
                    if (res.status === 201) {
                        console.log('Success');
                    }
                    return res.json();
                }
            )
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success: ', response))
    };

    onImportClick = () => {
        if(document.getElementById("dataInput").value != "") {
            const jsonData = {
                "importType": "Transaction",
                "importFileName": document.getElementById("dataInput").value,
                "recordsAdded": this.state.uploadData.length,
                "_id": '5ac8615a3e351c3dccba5607',
                "_pid": '5aa43585955a2561e0935cdb'
            };
            const importList = [...this.state.importRecords];
            importList.push(jsonData);
            this.addImportToServer(jsonData);
            this.setState({
                importRecords: importList
            })
        }
      
        if (this.state.uploadData.length > 0) {
            const dateFormat = 'YYYY-MM-DD';
            const transactionSchema = {
                "id": "/Transaction",
                "type": "object",
                "properties": {
                    "transactionDate": {
                        "type": Date,
                        "required": true,
                        "minLength": 1,
                        "format": "dateFormat"
                    },
                    "category": {
                        "type": "string",
                        "required": true,
                        "minLength": 1
                    },
                    "description": {
                        "type": "string",
                        "required": true,
                        "minLength": 1
                    },
                    "amount": {
                        "type": Number,
                        "required": true,
                        "minLength": 1
                    }
                    // check categories that they have already.
                    // take longest length of value
                    // whatever cell has the longest length <--- use that as description
                },
                "required": ["transactionDate", "category", "description", "amount"]
            };

            const v = new Validator();
            var i = 5503;

            const transactionsList = [];
            this.state.uploadData.forEach(element => {
                const test = v.validate(element, transactionSchema);
                console.log(v.validate(element, transactionSchema));
                const id = "5ac8615a3e351c3dccba" + i;
                element["_id"] = id;
                element["_pid"] = "5aa43585955a2561e0935cdb";
                i++;
                transactionsList.push(element);
            });
            this.addTransactionToServer(transactionsList);
            document.getElementById("dataInput").value = "";

            this.setState({
                data: []
            });
        }
    }

    backToTransactionComponent = () => {
        this.props.history.push('/transaction');
    }

    render() {
        const keys = [
            "transactionDate",
            "category",
            "description",
            "amount"
        ]

        return (
            <div>
                <p> <a onClick={this.backToTransactionComponent}>Transactions </a> > Import Transactions </p>
                <h1>Import Transactions </h1>
                <Button onClick={this.onImportClick}>
                    <Icon type="upload" /> Import
                </Button>

                <CsvParse keys={keys} onDataUploaded={this.handleData}
                    render={
                        onChange => <input
                            type="file" id="dataInput"
                            onChange={onChange}
                        />}>
                </CsvParse>
                {this.state.data.length > 0 ? (<Table dataSource={this.state.data} columns={columns} />) : (<Table dataSource={this.state.importRecords} columns={importColumns} />)}

            </div>
        )
    }
}

export default withRouter(Import);