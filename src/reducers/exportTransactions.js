export function exportedFilesHasErrored(state = false, action) {
    switch (action.type) {
        case 'EXPORTED_FILES_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function exportedFilesIsLoading(state = false, action) {
    switch (action.type) {
        case 'EXPORTED_FILES_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function exportedFiles(state = [], action) {
    switch (action.type) {
        case 'EXPORTED_FILES_FETCH_DATA_SUCCESS':
            return action.exportedRecords;
        case 'ADD_EXPORT_RECORD_TO_STORE':
            return [
                ...state, action.newItem,
            ];
        default:
            return state;
    }
}
