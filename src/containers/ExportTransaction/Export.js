import React from 'react';
import { withRouter} from 'react-router-dom';
import { Button, Table, Icon } from 'antd';
import CsvParse from '@vtex/react-csv-parse';

const columns = [
    {title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate'},
    {title: 'Category', dataIndex: 'category', key: 'category'}, 
    {title: 'Description', dataIndex: 'description', key: 'description'},
    {title: 'Amount', dataIndex: 'amount', key: 'amount'}
];
const moment = require('moment');
const Json2csvParser = require('json2csv').Parser;
const fields = ['Transaction Date', 'Category', 'Description', 'Amount'];
const fs = require('fs');


class Export extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadData: {},
            data: []
        };
    }

    onExportClick = () => {
        alert('Exporting Clicked');
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
            .then(jsonData => {
                const json2csvParser = new Json2csvParser({ fields });
                const data = json2csvParser.parse(jsonData);
                console.log(data);
                return data;
            })
            
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
                 <p> <a onClick={this.backToTransactionComponent}>Transactions </a> > Export Transactions </p>
                <h1>Export Transactions </h1> 
                <Button onClick={this.onExportClick}>
                    <Icon type="upload" /> Export
                </Button>
                {this.state.data.length > 0 ? (<Table dataSource={this.state.data} columns={columns} />) : 
                (<p> Log of previous Exports </p>)}     
            </div>
        )
    }
}

export default withRouter(Export);