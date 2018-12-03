const axios = require('axios');

export function editTransactionFromServer(editTransaction, id) {
    axios.put(`${editTransaction}${id}`)
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}
export default editTransactionFromServer;
