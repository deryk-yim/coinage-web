import { Modal } from 'antd';

export function createImportRecord(importType, fileName, recordsAdded, pid) {
    if (document.getElementById("dataInput").value != "") {
        const jsonData = {
            "importType": importType,
            "importFileName": fileName,
            "recordsAdded": recordsAdded,
            "_pid": pid
        };
        return jsonData;
    }
}

export function addImportFileToServer(importRecords) {
    const endpoint = 'http://localhost:3000/import/create/1/5aa43585955a2561e0935cdb';
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
