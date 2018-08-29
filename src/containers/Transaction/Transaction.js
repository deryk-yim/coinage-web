import React from 'react';
import { Button, Table, Icon, Spin } from 'antd';
import '../Transaction/Transaction.css';
import { connect } from 'react-redux';
import AddTransactionPage from '../AddTransaction/AddTransactionPage';
import { transactionsFetchData } from '../../actions/actionTransaction';
import { categoriesFetchData } from '../../actions/actionCategory';
import { deleteTransactionFromServer } from '../DeleteTransaction/DeleteTransaction';
import { removeTransactions } from '../../actions/actionDeleteTransaction';

const getTransactionsEndpoint = 'http://localhost:3000/transaction/5aa43585955a2561e0935cdb';
const getCategoriesEndpoint = 'http://localhost:3000/category/5aa43585955a2561e0935cdb';
const deleteTransactionsEndpoint = 'http://localhost:3000/transaction/delete/5aa43585955a2561e0935cdb';
const deleteList = [];
const deleteNoIdList = [];

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

        console.log("Empty array?: " + deleteList);
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
                <Table rowSelection={rowSelection} dataSource={this.props.transactions} columns={columns} />
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
        fetchTransactionsData: (url) => dispatch(transactionsFetchData(url)),
        fetchCategories: (url) => dispatch(categoriesFetchData(url)),
        deleteIds: (ids) => dispatch(removeTransactions(ids)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);