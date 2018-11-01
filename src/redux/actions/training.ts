import { ofType } from 'redux-observable';
import { actionTypes, apiUrls } from '../../constants';
import { REQUEST } from '../../constants/common';

export const fetchNoList = () => ({
  type: actionTypes.training.FETCH_NO_LIST,
  [REQUEST]: {
    url: apiUrls.training.FETCH_NO_LIST,
    method: apiUrls.Method.GET,
    data: {},
    options: { transformResponse: (response: { [key: string]: any }) => ({ ...response }) }
  }
});

export const fetchProblemList = (pageId: number) => ({
  type: actionTypes.training.FETCH_PROBLME_LIST,
  payload: { pageId },
  [REQUEST]: {
    url: apiUrls.training.FETCH_PROBLEM_LIST,
    method: apiUrls.training.FETCH_PROBLEM_LIST,
    data: { pageId },
    options: { transformResponse: (response: { [key: string]: any }) => ({ ...response, pageId }) }
  }
});
