// import action types
import { 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  

} from '../actions/productActions';

// the way reducer works is that they take current state & action objects
// to return a new global state in the redux store object

// reducer takes two things
// state = { products: [] } - current state of this reducer 
// products:[] - adding products list state into our redux store
// this reducer's initial state & action objects to add/update our global state - redux store
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      // when component renders starts loading
      // products: [] - current products state to start with which is not fulfilled yet
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false, // now it's done loading & making request
        products: action.payload, // fetched data
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false, // now it's done loading & making request
        error: action.payload, // adding error piece of state with new error prop
      };
    default:
      return state;
  }
};

// products details
// this reducer's current/initial state & action objects to add/update our global state
// { reviews: [] } - product has reviews, its an array of objects
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      // when component renders starts loading
      // products: [] - current products state to start with which is not fulfilled yet
      return { loading: true, products: [] };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false, // now it's done loading & making request
        products: action.payload, // fetched data
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false, // now it's done loading & making request
        error: action.payload, // adding error piece of state with new error prop
      };
    default:
      return state;
  }
};

