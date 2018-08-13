export function deleteTransactionFromServer (endpoint, selectedRows) {
    for (let i = 0; i < selectedRows.length > 0; i++) {
        const endpointDelete = endpoint + '/' + selectedRows[i]._id;
        fetch(endpointDelete, {
            method: 'delete'
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                }
                else {
                    throw new Error('Try Again Later');
                }
            })
            .catch((err => {
                error: err
            }))
    }
}