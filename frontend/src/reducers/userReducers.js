import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../actions/userActions';

// user login reducer
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false, // now it's done loading & making request
        userInfo: action.payload, // fetched user data
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false, // now it's done loading & making request
        error: action.payload, // adding error piece of state with new error prop
      };
    case USER_LOGOUT:
      return {}; // empty object when user logout

    default:
      return state;
  }
};

// user register reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false, // now it's done loading & making request
        userInfo: action.payload, // fetched user data
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false, // now it's done loading & making request
        error: action.payload, // adding error piece of state with new error prop
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
