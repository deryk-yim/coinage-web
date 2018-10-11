export function removeTransactions(transactionId) {
    return {
        type: 'DELETE_TRANSACTIONS_FROM_STORE',
        transactionId
    }
}
