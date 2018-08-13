export function importTransactions(transactions) {
    return {
        type: 'IMPORT_TRANSACTIONS_TO_STORE',
        transactions
    };
}

export function showAllImportFiles(importedRecords) {
    return {
        type: 'SHOW_IMPORTED_RECORDS',
        importedRecords
    };
}