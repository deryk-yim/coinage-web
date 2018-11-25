export function importedFilesHasErrored(bool) {
    return {
        type: 'IMPORTED_FILES_HAS_ERRORED',
        hasErrored: bool,
    };
}

export function importedFilesIsLoading(bool) {
    return {
        type: 'IMPORTED_FILES_IS_LOADING',
        isLoading: bool,
    };
}

export function importedFilesFetchDataSuccess(importedRecords) {
    return {
        type: 'IMPORTED_FILES_FETCH_DATA_SUCCESS',
        importedRecords,
    };
}

export function importedFilesFetchData(url) {
    return (dispatch) => {
        dispatch(importedFilesHasErrored(true));
        fetch(url, {
            method: 'post',
        })
            .then((res) => {
                if (!(res.status >= 200 && res.status < 300)) {
                    throw new Error('Try Again Later');
                } else {
                    dispatch(importedFilesIsLoading(false));
                    return res.json();
                }
            })
            .then(jsonData => jsonData)
            .then(records => dispatch(importedFilesFetchDataSuccess(records)))
            .catch(() => dispatch(importedFilesHasErrored(true)));
    };
}

export function addImportHistory(importRecord) {
    return {
        type: 'ADD_IMPORT_RECORD_TO_STORE',
        newItem: importRecord,
    };
}

