import { Modal } from 'antd';
const moment = require('moment');


export function createExportRecord(exportType, fileName, recordsAdded, pid, errorMessage, errorContent) {
    if (document.getElementById("dataInput").value != "") {
        const jsonData = {
            "exportType": exportType,
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

export function addExportFileToServer(importRecords, endpoint) {
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