import { Modal } from 'antd';
import axios from 'axios';

const moment = require('moment');

export function createImportRecord(importType,
    fileName, recordsAdded, pid, errorMessage, errorContent) {
    if (this.refs.value !== '') {
        const jsonData = {
            importType,
            importFileName: fileName,
            createdDate: moment().format(),
            recordsAdded,
            pid,
            errorMessage,
            errorContent,
        };
        return jsonData;
    }
    return undefined;
}

export function addImportFileToServer(importRecord, endpoint) {
    axios.post(endpoint, importRecord)
        .then((res) => {
            if (res.status === 201) {
                console.log('Success');
            }
            return res.json();
        })
        .catch(errorMsg => console.error('Error:', errorMsg))
        .then(response => console.log('Success: ', response));
}

export function addTransactionToServer(transactions, endpoint) {
    axios(endpoint, transactions)
    .then(
            (res) => {
                if (res.status === 201) {
                    console.log('Success');
                }
                return res.json();
            },
        )
        .catch(errorMsg => console.error('Error:', errorMsg))
        .then(response => console.log('Success: ', response));
}

export function error() {
    Modal.error({
        title: 'Please choose a CSV file',
        content: 'Accepted formats are .csv',
    });
}

export function showImportErrors(errorReasons) {
    Modal.error({
        title: 'Import Failed!',
        content: errorReasons,
    });
}

