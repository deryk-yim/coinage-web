export function requestPage(endpoint, page) {
  return {
    type: 'REQUEST_PAGE',
    payload: {
      page
    },
    meta: {
      endpoint,
      resultKey
    }
  }
};

export function receivePage(page, results) {
  return {
    type: 'RECEIVE_PAGE',
    payload: {
      page,
      results
    }
  }
};