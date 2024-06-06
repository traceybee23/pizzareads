const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';


export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});


const initialState = {
  query: '', // Initial search query is empty
};


const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload, // Update the search query
      };
    default:
      return state;
  }
};

// Selector to access search query from the state
export const selectSearchQuery = (state) => state.search.query;

export default searchReducer;
