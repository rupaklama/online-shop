import axios from 'axios';

// action types
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

// user login action creator with email & password params 
export const login = (email, password) => async dispatch => {
  try {
    // login request
    dispatch({ type: USER_LOGIN_REQUEST });

    // after login request, sending request headers object
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:7000/api/users/login',
      // request body object with headers
      { email, password },
      config
    );

    // dispatch user data to reducer
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data, 
    })

    // at the same time, store our user data in 
    // local storage for re-authentication & to persist data
    localStorage.setItem('userInfo', JSON.stringify(data)) // key/value 
    // accessing user data from local storage in our store.js 
    // NOTE: This data will also be loaded in our Redux Store to persist data

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

// logout action creator
export const logout = () => dispatch => {
  // to remove from local storage & update our redux state
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT })
}

// user login action creator with email & password params 
export const register = (name, email, password) => async dispatch => {
  try {
    // register request
    dispatch({ type: USER_REGISTER_REQUEST });

    // after login request, sending request headers object
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:7000/api/users',
      // request body object with headers
      { name, email, password },
      config
    );

    // dispatch user data to reducer
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data, 
    })

    // after user register, sign in user right away
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    }) 

    // at the same time, store our user data in 
    // local storage for re-authentication & to persist data
    localStorage.setItem('userInfo', JSON.stringify(data)) // key/value 
    // accessing user data from local storage in our store.js 
    // NOTE: This data will also be loaded in our Redux Store to persist data

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};
