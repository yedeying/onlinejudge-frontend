export enum Method {
  POST = 'post',
  GET = 'get'
}

/**
 * ===============API BASE================
 */
export const API_BASE = '/api';

/**
 * ===============TRAINING==================
 */
export const TRAINING = `${API_BASE}/training`;
export const HOST = __DEV__ ? 'http://127.0.0.1:3003' : '';

export const training = {
  FETCH_NO_LIST: `${HOST}${TRAINING}/noList`,
  FETCH_PROBLEM_LIST: `${HOST}${TRAINING}/problemList/:pageId`,
  FETCH_PROBLEM_DETAIL: `${HOST}${TRAINING}/problem/:problemNo`
};
