import React from 'react';
import CsvParse from '@vtex/react-csv-parse';
import { connect } from 'react-redux';
import { Button, Table, Icon, Spin, Progress } from 'antd';
import '../Transaction/Transaction.css';
import { addTransactionEndpoint } from '../../api-requests/transaction';

import { createImportRecord, addTransactionToServer, addImportFileToServer, showImportErrors } from '../ImportTransaction/ImportTransaction';
import { doValidate } from '../ImportTransaction/ImportTransactionValidator';
import { importedFilesFetchData, addImportHistory } from '../../actions/ImportHistory';
import { addImportedFile } from '../../api-requests/import';

const columns = [
    { title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
];

const pid = '5aa43585955a2561e0935cdb';

class ImportTransactionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            selectedRowKeys: [],
            data: [],
            percent: 0,
            importProgressFlag: false,
            filePresent: false,
        };
    }

    componentWillMount() {
        // eslint-disable-next-line react/prop-types
        // this.props.fetchImportedFiles(getImportedFilesHistory);
    }

    // eslint-disable-next-line react/sort-comp
    backToTransactionComponent = () => {
        // eslint-disable-next-line react/prop-types
        this.props.history.push('/transaction');
    };

    handleData = (data) => {
        this.setState({
            data,
            filePresent: true,
        });
    }

    onImport = () => {
        if (this.ref.dataInput.value !== '') {
            this.setState({
                importProgressFlag: true,
            });
            if (this.state.data.length > 0) {
                if (doValidate(this.state.data).length < 1) {
                    const importSuccessRecord = createImportRecord(
                        'Transactions',
                        this.ref.files[0].name,
                        this.state.data.length,
                        pid);
                    addImportFileToServer(importSuccessRecord, addImportedFile,
                    );
                    // eslint-disable-next-line react/prop-types
                    this.props.addImportedFile(importSuccessRecord);

                    addTransactionToServer(this.state.data,
                        addTransactionEndpoint);
                } else {
                    const importFailedRecord = createImportRecord(
                        'Transactions',
                        this.ref.files[0].name,
                        0,
                        pid,
                        'FAILED',
                        doValidate(this.state.data).join(),
                    );
                    addImportFileToServer(importFailedRecord, addImportedFile,
                    );
                    this.props.addImportedFile(importFailedRecord);
                }
            }
        }
        this.setState({
            data: [],
            filePresent: false,
        });
    }

    clearAll = () => {
        this.setState({
            data: [],
            filePresent: false,
        });
    }

    increase = () => {
        let percent = this.state.percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({ percent });
    }


    removeSelectedRows = () => {
        const records = [...this.state.data];
        const removeRecords = [...this.state.selectedRows];
        const newSet = records.filter(
            // eslint-disable-next-line func-names
            function (e) {
                return this.indexOf(e) < 0;
            }, removeRecords);
        this.setState({
            data: newSet,
            selectedRows: [],
            selectedRowKeys: [],
        });
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        console.log(selectedRows);
        this.setState({
            selectedRows,
        });
    }

    render() {
        const keys = [
            'transactionDate',
            'category',
            'description',
            'amount',
            'errorMessage',
        ];
        const importColumns = [
            { title: 'Import Date', dataIndex: 'createdDate', key: 'createdDate' },
            { title: 'File Name', dataIndex: 'importFileName', key: 'importFileName' },
            { title: 'Records Added', dataIndex: 'recordsAdded', key: 'recordsAdded' },
            {
                title: 'Errors and Alerts',
                dataIndex: 'errorMessage',
                key: 'errorMessage',
                // eslint-disable-next-line consistent-return
                render: (_text, record) => {
                    // eslint-disable-next-line react/prop-types
                    if (this.props.importedFiles.length > 0) {
                        if (record.errorMessage === 'FAILED') {
                            return (<Button onClick={() => showImportErrors(record.errorContent)}>
                            {record.errorMessage} </Button>);
                        }
                    }
                },

            },

        ];

        const { selectedRowKeys } = this.state;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        const hasRecords = this.props.importedFiles.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div>
                <p> <div> <a> onClick={this.backToTransactionComponent}
                Transactions </a> </div>  Import Transactions </p>
                <h1>Import Transactions </h1>
                <Button onClick={this.onImport} disabled={!this.state.filePresent}>
                    <Icon type="upload" /> Import
                </Button>
                <Button onClick={this.removeSelectedRows} disabled={!hasSelected}>
                    <Icon type="delete" /> Delete
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Button onClick={this.clearAll} disabled={this.state.data.length < 1}>
                    Clear All
                </Button>
                <CsvParse
                  keys={keys} onDataUploaded={this.handleData}
                  render={
                        onChange => (<input
                          type="file" id="dataInput"
                          onChange={onChange}
                        />)}
                />
                <Spin spinning={!hasRecords} />
                {this.state.importProgressFlag === true ? (
                    <Progress percent={this.state.percent} />
                ) : (
                        <p />
                    )}
                {this.state.data.length > 0 ?
                    (<Table
                      rowSelection={rowSelection}
                      dataSource={this.state.data} columns={columns}
                    />) :
                    (<Table dataSource={this.props.importedFiles} columns={importColumns} />)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    importedFiles: state.importedFiles,
});

const mapDispatchToProps = dispatch => ({
    fetchImportedFiles: url => dispatch(importedFilesFetchData(url)),
    addImportedFile: importedFile => dispatch(addImportHistory(importedFile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportTransactionPage);
