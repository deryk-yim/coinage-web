const moment = require('moment');

export function createExportRecord(exportType, fileName, recordsAdded, pid, errorMessage, errorContent) {
        const jsonData = {
            "exportType": exportType,
            "exportFileName": fileName,
            "createdDate": moment().format(),
            "recordsExported": recordsExported,
            "_pid": pid,
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