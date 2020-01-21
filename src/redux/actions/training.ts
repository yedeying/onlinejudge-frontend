import { actionTypes, apiUrls } from '$constants';
import { REQUEST } from '$constants/common';

export const fetchPageList = () => ({
  type: actionTypes.common.FETCH_PAGE_LIST,
  [REQUEST]: {
    url: apiUrls.training.FETCH_PAGE_LIST,
    method: apiUrls.Method.GET
  }
});

export const fetchProblemList = (pageId: string) => ({
  type: actionTypes.common.FETCH_PROBLEM_LIST,
  payload: { pageId },
  [REQUEST]: {
    url: apiUrls.training.FETCH_PROBLEM_LIST.replace(':pageId', pageId),
    method: apiUrls.Method.GET
  }
});

export const fetchProblemDetail = (problemNo: string) => ({
  type: actionTypes.common.FETCH_PROBLEM_DETAIL,
  payload: { problemNo },
  [REQUEST]: {
    url: apiUrls.training.FETCH_PROBLEM_DETAIL.replace(':problemNo', problemNo),
    method: apiUrls.Method.GET
  }
});

export const fetchStatusList = (pageNum: number, pageSize: number) => ({
  type: actionTypes.common.FETCH_STATUS_LIST,
  payload: { pageSize, pageNum },
  [REQUEST]: {
    url: apiUrls.training.FETCH_STATUS_LIST,
    method: apiUrls.Method.POST
  }
});
