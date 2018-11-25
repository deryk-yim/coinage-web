function deleteTransactionFromServer(endpoint, selectedRows) {
    for (let i = 0; i < selectedRows.length; i += 1) {
        const endpointDelete = `${endpoint}/${selectedRows[i]._id}`;
        fetch(endpointDelete, {
            method: 'delete',
        })
            .then((res) => {
                if (!(res.status >= 200 && res.status < 300)) {
                    throw new Error('Try Again Later');
                } else {
                    return res.json();
                }
            })
            .catch((err => ({
                error: err,
            })));
    }
}
export default deleteTransactionFromServer;
