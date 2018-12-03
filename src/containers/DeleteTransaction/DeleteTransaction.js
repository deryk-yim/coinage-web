const axios = require('axios');

export function deleteTransactionFromServer(endpoint, selectedRows) {
    for (let i = 0; i < selectedRows.length; i += 1) {
        /* eslint no-underscore-dangle: 0 */
        const endpointDelete = `${endpoint}/${selectedRows[i]._id}`;
        axios.delete(endpointDelete)
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
