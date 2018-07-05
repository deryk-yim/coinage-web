import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Icon } from 'antd';
import '../Transaction/Transaction.css';
import AddTransactionDialog from '../AddTransactionDialog/AddTransactionDialog';
import CsvParse from '@vtex/react-csv-parse';

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
            uploadData: {},
            importData: {}
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
                    throw new Error('Try Again Later');
                }
            })
            .then(jsonData => {
                for(let i = 0; i < jsonData.length; i++) {
                    jsonData[i].amount = jsonData[i].amount.toFixed(2);
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

    addTransactionToServer = (transactions) => {
        const endpoint = 'http://localhost:3000/transaction/create/2/5aa43585955a2561e0935cdb';
        
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(transactions),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then (
            res => {
                if(res.status === 201) {
                    console.log('Success');
                }
                return res.json();
            }
        )
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success: ', response))
        };

    onExportClick = () => {
        if(this.state.jsonData.length > 0) {
            const fields = [];
            const json2csvParser = new Json2csvParser({ fields });
            const csv = json2csvParser.parse(this.state.data);
            console.log(csv);
        }
    }
  
    onImportClick = () => {
        if(this.state.uploadData.length > 0) {  
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

            // not working
            this.setState({
                uploadData: {}
            }, () => {
                this.updateFetch();
            });
        }

    }   

    componentDidUpdate() {
        
    }



    updateFetch = () => {
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
                console.log("see json Data on ComponentDidmount");
                console.log(jsonData);
                for(let i = 0; i < jsonData.length; i++) {
                    jsonData[i].amount = jsonData[i].amount.toFixed(2);
                    jsonData[i].transactionDate = moment(new Date(jsonData[i].transactionDate)).utc().format('MMM DD, YYYY');
                }
                return jsonData;
            })
            .then(jsonData => {
                this.setState({
                    data: jsonData
                })
            })
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

    render() {
        const keys = [
            "transactionDate",
            "category",
            "description",
            "amount"
        ]

        return (
            <div>
                <Button onClick={this.openAddTransaction}> + Add Transaction  </Button>
                <Button onClick={this.onImportClick}>
                    <Icon type="upload" /> Import
                </Button>
                <Button >
                    <Icon type="download" />Export
                </Button>
                <AddTransactionDialog addTransactionToServer={this.addTransactionToServer}
                    openAddTransaction={this.openAddTransaction}
                    closeAddTransaction={this.closeAddTransaction}
                    shown={this.state.isOpenAddTrans}
                />
                <CsvParse keys={keys} onDataUploaded={this.handleData}
                    render={
                        onChange => <input
                            type="file" id="dataInput"
                            onChange={onChange}
                        />}>
                </CsvParse>
                <Table dataSource={this.state.data} columns={columns} />
            </div>
        )
    }
}

export default Transaction;