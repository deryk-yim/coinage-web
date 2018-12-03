import axios from 'axios';

export function categoriesHasErrored(bool) {
    return {
        type: 'CATEGORIES_HAS_ERRORED',
        hasErrored: bool,
    };
}

export function categoriesIsLoading(bool) {
    return {
        type: 'CATEGORIES_IS_LOADING',
        isLoading: bool,
    };
}

export function categoriesFetchDataSuccess(categories) {
    return {
        type: 'CATEGORIES_FETCH_DATA_SUCCESS',
        categories,
    };
}

export function categoriesFetchData(url) {
    return (dispatch) => {
        dispatch(categoriesIsLoading(true));
        axios.get(url)
            .then((res) => {
                if (!(res.status >= 200 && res.status < 300)) {
                    throw new Error('Try Again Later');
                } else {
                    dispatch(categoriesIsLoading(false));
                    return res.json();
                }
            })
            .then(((categories) => {
                console.log(categories);
                return categories;
            }))
            .then(categories => dispatch(categoriesFetchDataSuccess(categories)))
            .catch(() => dispatch(categoriesHasErrored(true)));
    };
}

