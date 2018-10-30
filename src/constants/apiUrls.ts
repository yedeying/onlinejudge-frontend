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

export const training = {
  FETCH_NO_LIST: `${TRAINING}/noList`,
  FETCH_PROBLEM_LIST: `${TRAINING}/problemList/:pageId`
};
