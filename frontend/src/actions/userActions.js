import axios from 'axios';

// action types
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST'
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS'
export const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL'
export const USER_DETAILS_RESET = 'USER_DETAILS_RESET'

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST'
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS'
export const USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL'
export const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET'

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

// user details action creator 
// getState - to get our user info from redux store which has token in it
export const getUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    // destructuring userInfo data in userLogin to get token key
    const {
      userLogin: { userInfo },
    } = getState()

    // request headers object with user token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`http://localhost:7000/api/users/${user}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// user profile update action creator 
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // user is the data we want to update
    const { data } = await axios.put(`http://localhost:7000/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    // after update, sign in user right away to reflect changes
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // update local storage also
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    // const message =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
