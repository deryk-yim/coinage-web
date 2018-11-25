require('es6-promise').polyfill();
require('isomorphic-fetch');

export function exportedFilesHasErrored(bool) {
    return {
        type: 'EXPORTED_FILES_HAS_ERRORED',
        hasErrored: bool,
    }
}

export function exportedFilesIsLoading(bool) {
    return {
        type: 'EXPORTED_FILES_IS_LOADING',
        isLoading: bool,
    };
}

export function exportedFilesFetchDataSuccess(exportedRecords) {
    return {
        type: 'EXPORTED_FILES_FETCH_DATA_SUCCESS',
        exportedRecords,
    };
}

export function exportedFilesFetchData(url) {
    return (dispatch) => {
        dispatch(exportedFilesHasErrored(true));
        fetch(url, {
            method: 'post',
        })
            .then((res) => {
                if (!(res.status >= 200 && res.status < 300)) {
                    throw new Error('Try Again Later');
                } else {
                    dispatch(exportedFilesIsLoading(false));
                    return res.json()
                }
            })
            .then((jsonData) => {
                return jsonData;
            })
            .then(records => dispatch(exportedFilesFetchDataSuccess(records)))
            .catch(() => dispatch(exportedFilesHasErrored(true)));
    };
}

export function addExportHistory(exportRecord) {
    return {
        type: 'ADD_EXPORT_RECORD_TO_STORE',
        newItem: exportRecord,
    }
}

