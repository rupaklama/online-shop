// reducer takes two things
// products:[] - adding products list state into our redux store
// this reducer's initial state & action objects to update our global state - redux store
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      // when component renders starts loading
      // products: [] - current products state to start with which is not fulfilled yet
      return { loading: true, products: [] };
    case 'PRODUCT_LIST_SUCCESS':
      return {
        loading: false, // now it's done loading & making request
        products: action.payload, // fetched data
      };
    case 'PRODUCT_LIST_FAIL':
      return {
        loading: false, // now it's done loading & making request
        error: action.payload, // adding error piece of state with new error prop
      };
    default:
      return state;
  }
};
