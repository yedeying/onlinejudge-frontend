import { ofType } from 'redux-observable';
import { actionTypes, apiUrls } from '../../constants';
import { REQUEST } from '../../constants/common';

export const trainingEpic = action$ => action$.pipe(
  ofType('FETCH_NO_LIST')
);

export const fetchNoList = () => ({
  type: actionTypes.training.FETCH_NO_LIST,
  [REQUEST]: {
    url: apiUrls.training.FETCH_NO_LIST,
    method: apiUrls.method.POST,
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
