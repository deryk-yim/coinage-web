import { Modal} from 'antd';


export function showImportRecords(endpoint) {
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
            .then(importData => {
                console.log(importData);
                return importData;
            })
            .then(importData => {
                this.setState({
                    importRecords: importData
                })
            })
            .catch((err) => {
                console.log('handled the error');
            });
}

export function createImportRecord(importType, recordsAdded, pid) {
    if(document.getElementById("dataInput").value != "") {
        const jsonData = {
            "importType": importType,
            "importFileName": document.getElementById("dataInput").value,
            "recordsAdded": recordsAdded,
            "_pid": pid
        };
        return jsonData;
    }
}


export function addImportToServer (importRecord) {
    const endpoint = 'http://localhost:3000/import/create/1/5aa43585955a2561e0935cdb';
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(importRecord),
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



export function addTransactionToServer (transactions) {
    const endpoint = 'http://localhost:3000/transaction/create/2/5aa43585955a2561e0935cdb';
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
  