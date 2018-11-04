export function importedFilesHasErrored(state = false, action) {
    switch (action.type) {
        case 'IMPORTED_FILES_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function importedFilesIsLoading(state = false, action) {
    switch (action.type) {
        case 'IMPORTED_FILES_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function importedFiles(state = [], action) {
    switch (action.type) {
        case 'IMPORTED_FILES_FETCH_DATA_SUCCESS':
            return action.importedRecords;
        case 'ADD_IMPORT_RECORD_TO_STORE': 
            return [
                ...state, action.newItem
            ];
        default:
            return state;
    }
}