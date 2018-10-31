import { Action, RequestConfig, Request, Response, RequestAction, RequestError, ErrorAction } from '../../types';
import { apiUrls, common, actionTypes } from '../../../constants';

export function getActionTypes(action: RequestAction) {
  const startSuffix = actionTypes.suffix.START;
  const successSuffix = actionTypes.suffix.SUCCESS;
  const failSuffix = actionTypes.suffix.FAIL;
  const cancelSuffix = actionTypes.suffix.CANCEL;
  if (typeof action.type !== 'undefined') {
    const { type } = action;
    return {
      type,
      start: `${type}${startSuffix}`,
      success: `${type}${successSuffix}`,
      fail: `${type}${failSuffix}`,
      cancel: `${type}${cancelSuffix}`
    };
  } else {
    throw new Error('Action which matched axios middleware needs to have "type" or "types" key which is not null');
  }
}

function _getRequestDataKey(method: string): string {
  switch (method) {
    case apiUrls.Method.GET:
      return 'params';
    case apiUrls.Method.POST:
      return 'data';
    default:
      return 'params';
  }
}

export function getRequestConfig(action: RequestAction): Request {
  return action[common.REQUEST];
}

export function getRequestData(action: RequestAction): { [key: string]: any } {
  const config = getRequestConfig(action);
  if (!config) {
    return {};
  }
  const methodKey = _getRequestDataKey(config.method);
  const requestData = config[methodKey];
  return requestData || {};
}

export const requestActions = {
  start: (action: RequestAction): Action => {
    const requestData = getRequestData(action);
    return {
      type: getActionTypes(action).start,
      payload: { ...action.payload, ...requestData },
      meta: { isLoading: true, previousAction: action }
    };
  },

  success: (action: RequestAction, response: Response): Action => {
    const payload = action.payload;
    const { meta } = action;
    const { data } = response;
    return {
      type: getActionTypes(action).success,
      payload: { ...payload, ...response },
      meta: {
        ...meta,
        isLoading: false,
        previousAction: action
      }
    };
  },

  fail: (action: RequestAction, error: RequestError): ErrorAction => {
    const response = {};
    const requestData = getRequestData(action);

    // 约定：
    // 注意在reducer中handle的时候我们需要去action.error里获取错误信息
    // 而在payload中拿取请求参数
    return {
      type: getActionTypes(action).fail,
      error,
      payload: { ...action.payload, ...requestData, ...response },
      meta: {
        previousAction: action,
        isLoading: false,
        isError: true
      }
    };
  },

  cancel: (action: RequestAction): Action => {
    const requestData = getRequestData(action);
    return {
      type: getActionTypes(action).cancel,
      payload: { ...requestData },
      meta: {
        previousAction: action,
        isLoading: false,
        isError: false
      }
    };
  }
};
