export enum Method {
  POST = 'post',
  GET = 'get'
}

export const HOST = __DEV__ ? 'http://127.0.0.1:3003' : '';
export const API_BASE = `${HOST}/api`;

export const TRAINING = `${API_BASE}/training`;
export const USER = `${API_BASE}/user`;

export const training = {
  FETCH_PAGE_LIST: `${TRAINING}/pageList`,
  FETCH_PROBLEM_LIST: `${TRAINING}/problemList/:pageId`,
  FETCH_PROBLEM_DETAIL: `${TRAINING}/problem/:problemNo`,
  FETCH_STATUS_LIST: `${TRAINING}/statusList`
};

export const user = {
  LOGIN: `${USER}/login`,
  LOGOUT: `${USER}/logout`,
  REGISTER: `${USER}/register`,
  FETCH_USER_INFO: `${USER}/info`
};
