import axios from 'axios';

// action types
// variable for action types which will give us better feedback if 
// we mistype action types, avoiding variable undefined issues
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST';
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS';
export const PRODUCT_DETAILS_FAIL= ' PRODUCT_DETAILS_FAIL';

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
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // making fetch request
    const { data } = await axios.get('http://localhost:7000/api/products');

    // now we want to dispatch PRODUCT_LIST_SUCCESS to reducer
    // which should pass down into our global state
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // if something goes wrong, dispatch PRODUCT_LIST_FAIL
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // custom message
          : error.message, // to display generic message
    });
  }
};

// making get request for products detail page
export const listProductDetails = (id) => async (dispatch) => { // takes id param
  try {
    
  } catch (error) {
    
  }
}

// To make Async network request inside our Redux application,
// we have to use middleware like 'Redux Thunk'

// Basically, with the help of Redux thunk, we can return a function inside Action Creator
// For example like function which makes a network request and
// it gets automatically call/invoke by Redux Thunk 
// NOTE: Redux thunk also returns our Action objects as usual
// NOW, all our Action Creators whether its returning Objects or functions 
// get dispatch through Redux Thunk & then to our Reducer
// Without Redux Thunk usually our Action Creators get dispatch directly to our Reducers

// Middleware is Function that gets called with every action with dispatch. 
// Middleware has the ability to STOP, MODIFY & mess around with actions
// Popular use of middleware is for dealing with async actions. 
// We are going to use a Redux Thunk to solve our async issues. 

// NOTE: After calling this Action creator, an action object with Type & Payload 
// gets dispatch into our middleware 'Redux Thunk' and then to our reducer
// Usually, action creators get dispatch directly to our reducer, but 
// in this case, we are making a network request 

// func returning func old syntax
// export const fetchPosts = () => {
  // NOTE: RETURNING A FUNC HERE TO MAKE NETWORK REQUEST 
//   return async function(dispatch, getState) {
//     // request to post endpoint 
//     // now with redux thunk, we can use async/await syntax to
//     // make our action creator - Asynchronous
//     const response = await jsonPlaceholder.get('/posts')
    
//     // now with the help of redux thunk, our action creators can return action objects or functions
//     // NOTE: if function, we can use its dispatch method to dispatch our function to the reducers in redux store
//     dispatch({ type: 'fetch_posts', payload: response.data })  // name & data
//     // console.log(response.data)
//   }
// }

// The biggest difference between promises and async/await is that 
// the Await expression causes async function execution to pause until a promise is settled/fulfilled
// but with Promise, Promise object don't await & starts execution of other code, promising value in future
