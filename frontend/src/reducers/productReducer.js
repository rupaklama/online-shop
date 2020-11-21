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

// NOTE: breaking up everything into Separate Reducers as it makes easier to debug
// & causes less issue like displaying wrong piece of state 

// RULES for updating our state object inside reducer is that
// we always have to return a brand new object so that we will never modify
// our state object directly.

// reducer takes two things
// state = { products: [] } - current state of this reducer 
// products:[] - adding 'products property' into our state to add products
// this reducer's initial/current state & action objects to add/update our global state - redux store
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      // when component renders starts loading
      // added prop 'loading' - with true value in our state
      // products: [] - current products state to start with which is not fulfilled yet
      return { ...state, loading: true  };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false, // now it's done loading & making request
        products: action.payload, // fetched data
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state, 
       loading: false, // now it's done loading & making request
        error: action.payload, // adding error piece of state with new error prop
      };
    default:
      return state;
  }
};

// products details
// this reducer's current/initial state & action objects to add/update our global state
// product: {} - adding 'product property' into our state to add product
// { reviews: [] } - product has reviews, therefore, adding 'reviews property' to add reviews
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      // when component renders starts loading
      // updated current state
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false, // now it's done loading & making request
        product: action.payload, // fetched data
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // now it's done loading & making request
        error: action.payload, // set error piece of state
      };
    default:
      return state;
  }
};

