import { combineReducers } from 'redux';

// import all our reducers here
import { cartReducer } from './cartReducers';
import { orderCreateReducer } from './orderReducers';
import { productListReducer, productDetailsReducer } from './productReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './userReducers';

// this will house CombineReducers func which combines 
// multiple Reducers into Single Object - redux store
export default combineReducers({
  // passing each of our Reducers as key/value properties 
  // to create GLOBAL State Object in Redux Store
  productList: productListReducer, // product list state
  productDetails: productDetailsReducer, // product detail state
  cart: cartReducer, // cart state 
  userLogin: userLoginReducer, // user login state
  userRegister: userRegisterReducer, // user register state
  userDetails: userDetailsReducer, // user details state
  userUpdateProfile: userUpdateProfileReducer, // user update state
  orderCreate: orderCreateReducer,  // order state
})

