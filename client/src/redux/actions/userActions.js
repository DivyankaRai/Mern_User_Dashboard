// actions/userActions.js

import { LOGIN_SUCCESS, LOGOUT } from './types';

import { UPDATE_USER_DATA } from './types';

export const updateUserData = (userData) => ({
  type: UPDATE_USER_DATA,
  payload: userData,
});

export const loginSuccess = (userData, token) => ({
  type: LOGIN_SUCCESS,
  payload: { userData, token },
});

export const logout = () => ({
  type: LOGOUT,
});
