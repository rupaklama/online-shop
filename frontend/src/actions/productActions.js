import axios from 'axios';

// Action creators to modify our global State Object
// Action Creator function returns/dispatch JS objects to Reducer
// Type is required, payload property is optional
// action creator functions get call inside of our components to change/update our global state value

// making get request to fetch products
// redux thunk allows us to have func returning func syntax
export const listProducts = () => async dispatch => {
  // dispatching an action object with dispatch function
  try {
    // getting ready to send request
    // this will call PRODUCT_LIST_REQUEST in reducer & set loading to true,
    // products: [] will still be empty because it hasn't fulfilled yet
    dispatch({ type: 'PRODUCT_LIST_REQUEST' });

    // making fetch request
    const { data } = await axios.get('http://localhost:7000/api/products');

    // now we want to dispatch PRODUCT_LIST_SUCCESS to reducer
    // which should pass down into our global state
    dispatch({
      type: 'PRODUCT_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    // if something goes wrong, dispatch PRODUCT_LIST_FAIL
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message
          : error.message, // to display generic message
    });
  }
};
