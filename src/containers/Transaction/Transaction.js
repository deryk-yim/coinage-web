import React from 'react';
import { Button, Table, Icon } from 'antd';
import '../Transaction/Transaction.css';
import { connect } from 'react-redux';
import AddTransactionPage from '../AddTransaction/AddTransactionPage';
import { transactionsFetchData } from '../../actions/actionTransaction';
import { categoriesFetchData } from '../../actions/actionCategory';
import { deleteTransactionFromServer } from '../DeleteTransaction/DeleteTransaction';
import { removeTransactions } from '../../actions/actionDeleteTransaction';
import {addTransactionToServer} from '../AddTransaction/AddTransaction';


const getTransactionsEndpoint = 'http://localhost:3000/transaction/5aa43585955a2561e0935cdb';
const getCategoriesEndpoint = 'http://localhost:3000/category/5aa43585955a2561e0935cdb';
const deleteTransactionsEndpoint = 'http://localhost:3000/transaction/delete/5aa43585955a2561e0935cdb';

const addTransactionEndpoint = 'http://localhost:3000/transaction/create/1/5aa43585955a2561e0935cdb';

const deleteList = [];

class Transaction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRows: [],
            selectedRowKeys: [],
            toDelete: [],
            uploadData: {},
            data: [],
            importRecords: []
        };
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('selectedRows changed: ', selectedRows);
        for (let i = 0; i < selectedRows.length; i++) {
            deleteList.push(selectedRows[i]['_id']);
        }
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows,
            toDelete: deleteList
        });
    }

    onDeleteRecord = () => {
        for (let i = 0; i < this.state.toDelete.length; i++) {
            this.props.deleteIds(this.state.toDelete[i]);
        }
        deleteTransactionFromServer(deleteTransactionsEndpoint, this.state.selectedRows);
        this.setState({
            toDelete: [],
            selectedRows: [],
            selectedRowKeys: []
        })
    }

    onImportClick = () => {
        this.props.history.push('/transaction/import');
    }

    /* once user is happy with the newly added transactions they can proceed to select FINAL and 
    records are created on the backend.
    will need to make this into a batch Add later..
    */
    handleCreateRecords = () => {
        for (let i = 0; i < this.props.transactions.length; i++) {
            if (!this.props.transactions[i].hasOwnProperty('_id')) {
                addTransactionToServer(
                    this.props.transactions[i], addTransactionEndpoint
                );
            }
        }
    }

    componentDidMount() {
        this.props.fetchTransactionsData(getTransactionsEndpoint);
        this.props.fetchCategories(getCategoriesEndpoint);
    }
    render() {
        const keys = [
            "transactionDate",
            "category",
            "description",
            "amount"
        ]

        let {
            sortedInfo
        } = this.state;

        sortedInfo = sortedInfo || {};

        const columns = [
            {
                title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate'
            },
            {
                title: 'Category', dataIndex: 'category',
                key: 'category',
                sorter: (a, b) => {
                    if (a.category < b.category) {
                        return -1
                    }
                    if (a.category > b.category) {
                        return 1;
                    }
                    return 0;
                }
            },
            { title: 'Description', dataIndex: 'description', key: 'description' },
            {
                title: 'Amount', dataIndex: 'amount', key: 'amount',
                sorter: (a, b) => a.amount - b.amount,
            },
        ];

        const { selectedRowKeys } = this.state;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        const hasRecords = this.props.transactions.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        return (
            <div>
                <AddTransactionPage />
                <Button onClick={this.handleCreateRecords}>
                    <Icon type="plus" /> Create Records
                </Button>
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
                <Table rowSelection={rowSelection} dataSource={this.props.transactions} columns={columns} />
            </div>
        )
    }
}

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