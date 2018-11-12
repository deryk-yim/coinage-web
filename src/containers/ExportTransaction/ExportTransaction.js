const Json2csvParser = require('json2csv').Parser;

const moment = require('moment');

const fields = ['transactionDate', 'category', 'description', 'amount'];

export function createExportRecord(exportType, fileName, recordsExported, pid) {
        const jsonData = {
            "exportType": exportType,
            "exportFileName": fileName,
            "createdDate": moment().format(),
            "recordsExported": recordsExported,
            "_pid": pid,
        };
        return jsonData;
    };

export function addExportFileToServer(exportRecord, endpoint) {
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(exportRecord),
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

export function exportCSV(data) {
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(data);
    return csv;
};
