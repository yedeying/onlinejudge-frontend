import { actionTypes, apiUrls } from '$constants';
import { REQUEST } from '$constants/common';

export const fetchUser = () => ({
  type: actionTypes.user.FETCH_USER_INFO,
  [REQUEST]: {
    url: apiUrls.user.FETCH_USER_INFO,
    method: apiUrls.Method.GET
  }
});

export const login = (username: string, password: string) => ({
  type: actionTypes.user.LOGIN,
  payload: { username, password },
  [REQUEST]: {
    url: apiUrls.user.LOGIN,
    method: apiUrls.Method.POST,
    data: { username, password }
  }
});

export const logout = () => ({
  type: actionTypes.user.LOGOUT,
  payload: {},
  [REQUEST]: {
    url: apiUrls.user.LOGOUT,
    method: apiUrls.Method.POST,
    data: {}
  }
});

export const register = (username: string, password: string, email: string) => ({
  type: actionTypes.user.REGISTER,
  payload: { username, password, email },
  [REQUEST]: {
    url: apiUrls.user.REGISTER,
    method: apiUrls.Method.POST,
    data: { username, password, email }
  }
});
