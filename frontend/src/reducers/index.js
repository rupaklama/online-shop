import { combineReducers } from 'redux';

// import all our reducers here
import { productListReducer } from './productReducer';

// this will house CombineReducers func which combines 
// multiple Reducers into Single Object - redux store
export default combineReducers({
  // passing each of our Reducers as key/value properties 
  // to create GLOBAL State Object in Redux Store
  productList: productListReducer, // product list global state in redux store
})

