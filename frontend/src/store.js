// creating separate file to access Redux Store in test files
import React from 'react';

// provider component to share data
import { Provider } from 'react-redux';

// Using other function from Redux - createStore ()
// to put all Reducers into the Redux Store object & create Global State object
// applyMiddleware - to add redux thunk
import { createStore, applyMiddleware } from 'redux';

// redux promise to make async network request
import thunk from 'redux-thunk';

// redux dev tool
import { composeWithDevTools } from 'redux-devtools-extension';

// import root reducer
import rootReducer from './reducers';

// to add multiple middleware here
const middleware = [thunk];

// This is a React Provider component & call with props object
// This component will wrap up other components

// Accessing cart data from local storage with key - 'cartItems'
// NOTE: This data will also be loaded in our Redux Store to persist data
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []; // if not found in local storage, its just going to be an empty array

// saving user data in local storage for re-authentication & to persist data
// NOTE: This data will also be loaded in our Redux Store to persist data
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null  // if nothing there, return null

const store = ({
  children,
  initialState = {
    // our redux store initial/current global state to PERSIST data
    // NOTE: this data will always come from local storage if it's in there

    // creating initial/current state for cart 
    cart: { cartItems: cartItemsFromStorage },

    // current state of user
    userLogin: { userInfo: userInfoFromStorage }
  },
}) => {
  // Wrap the children component with the Provider component.
  // pass in a single prop - store which takes in all the reducers
  return (
    <Provider
      store={createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
      )}
    >
      {children}
    </Provider>
  );
};

export default store;
