function editTransactionFromServer(transaction, editTransactionEndpoint, id) {
    fetch(`${editTransactionEndpoint}${id}`, {
        method: 'put',
        body: JSON.stringify(transaction),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}
export default editTransactionFromServer;