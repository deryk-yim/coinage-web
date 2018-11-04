import { Modal } from 'antd';
const moment = require('moment');


export function createImportRecord(importType, fileName, recordsAdded, pid, errorMessage, errorContent) {
    if (document.getElementById("dataInput").value != "") {
        const jsonData = {
            "importType": importType,
            "importFileName": fileName,
            "createdDate": moment().format(),
            "recordsAdded": recordsAdded,
            "_pid": pid,
            "errorMessage": errorMessage,
            "errorContent": errorContent
        };
        return jsonData;
    }
}

export function addImportFileToServer(importRecords, endpoint) {
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(importRecords),
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

export function addTransactionToServer(transactions, endpoint) {
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

export function error() {
    Modal.error({
        title: 'Please choose a CSV file',
        content: 'Accepted formats are .csv',
    });
}

export function showImportErrors(errorReasons) {
    Modal.error({
        title: 'Import Failed!',
        content: errorReasons
    });
}
