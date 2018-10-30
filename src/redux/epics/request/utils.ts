import { Action } from 'redux';
import { AxiosRequestConfig } from 'axios';
import { PayloadAction } from '../../types';
import { REQUEST } from '../../../constants/common';
import { actionTypes } from '../../../constants';

export const isRequestAction = (action: Action) => {
  return !!action[REQUEST];
};

export function getActionTypes(action: PayloadAction) {
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

export const requestActions = {
  start: (action: PayloadAction): PayloadAction => {
    const requestData = getRequestData(action);
    return {
      type: getActionTypes(action).start,
      payload: { ...action.payload, ...requestData },
      meta: { isLoading: true, previousAction: action },
    };
  },

  success: (action: PayloadAction, response: any): PayloadAction => {
    let payload = action.payload;
    // 抽离meta 和 真正的 response
    const { data, meta } = response;
    const actionOptions = getActionOptions(action);
    // 与response无关，单纯的就原有 payload 进行 requestData 的 merge.
    if (actionOptions && actionOptions.injectRequestData) {
      payload = getRequestDataMergedPayload(action);
    }
    // 获取转换后的response，与payload无关
    if (isRequestAction(action)) {
      response = getTransformedResponse(data, action);
    }
    // 聚合数据: { ...合并(?)requestData 的 payload，...转化(?)后的response }
    const finalPayload = payload ? { ...payload, ...response } : response;
    return {
      type: getActionTypes(action, actionOptions).success,
      payload: finalPayload,
      meta: {
        ...meta,
        isLoading: false,
        previousAction: action,
      },
    };
  },
  fail: (action: PayloadAction, error: any): ErrorAction => {
    let response = {};
    if (isRequestAction(action)) {
      response = getTransformedResponse(response, action);
    }
    const actionOptions = getActionOptions(action);
    const requestData = getRequestData(action);

    // 约定：
    // 注意在reducer中handle的时候我们需要去action.error里获取错误信息
    // 而在payload中拿取请求参数
    return {
      type: getActionTypes(action, actionOptions).fail,
      error,
      payload: { ...action.payload, ...requestData, ...response },
      meta: {
        previousAction: action,
        isLoading: false,
        isError: true,
      },
    };
  },
  cancel: (action: PayloadAction): Action => {
    const actionOptions = getActionOptions(action);
    const requestData = getRequestData(action);
    const abortOn = getAbortOn(action);
    return {
      type: getActionTypes(action, actionOptions).cancel,
      payload: { ...requestData, abortOn },
      meta: {
        previousAction: action,
        isLoading: false,
        isError: false,
      },
    };
  },
};
