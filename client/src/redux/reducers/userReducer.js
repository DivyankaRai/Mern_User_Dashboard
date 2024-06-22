// userReducer.js
import { LOGIN_SUCCESS, LOGOUT, UPDATE_USER_DATA } from '../actions/types';

const initialState = {
  isLoggedIn: false,
  userData: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload.userData.userData,
        token: action.payload.token,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        token: null,
      };
    default:
      return state;
  }
};

export default userReducer;
