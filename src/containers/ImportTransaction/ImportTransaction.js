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