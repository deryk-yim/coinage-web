export function categoriesHasErrored(bool) {
    return {
        type: 'CATEGORIES_HAS_ERRORED',
        hasErrored: bool
    }
}

export function categoriesIsLoading(bool) {
    return {
        type: 'CATEGORIES_IS_LOADING',
        isLoading: bool
    };
}

export function categoriesFetchDataSuccess(categories) {
    return {
        type: 'CATEGORIES_FETCH_DATA_SUCCESS',
        categories
    };
}

export function categoriesFetchData(url) {
    return (dispatch) => {
        dispatch(categoriesIsLoading(true));
        fetch(url, {
            method: 'get'
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    dispatch(categoriesIsLoading(false));
                    return res.json();
                }
                else {
                    throw new Error('Try Again Later');
                }
            })
            .then((categories => {
                console.log(categories);
                return categories;
            }))
            .then((categories) => dispatch(categoriesFetchDataSuccess(categories)))
            .catch(() => dispatch(categoriesHasErrored(true)));
    };
}