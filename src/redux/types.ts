import { REQUEST } from '../constants/common';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApplicationState } from './reducers/root';

export type RequestConfig = AxiosRequestConfig;
export type Response = AxiosResponse;
export type RequestError = AxiosError;
export type AppState = ApplicationState;

export interface ActionMeta {
  isLoading?: boolean;
  isError?: boolean;
  previousAction?: Action;
}

export interface Action {
  type: string;
  meta?: ActionMeta;
  error?: any;
  payload: any;
}

export interface Request {
  url: string;
  method: string;
  data: any;
  options?: any;
}

export interface RequestOptions {
  /* 请求控制层面配置 */
  // 是否只handle最后一个被监听的action，从而取消前一个saga
  takeLatest?: boolean;
  // 当遇到什么action时取消自身saga执行
  abortOn?: string | any;
  // 如果请求超时，重试的次数
  retryTimes?: number;
  // 如果请求超时，重试之间的间隔
  retryDelay?: number;
  /* action装饰配置 */
  // 覆盖默认的action开始后缀
  startSuffix?: string;
  // 覆盖默认的action成功后缀
  successSuffix?: string;
  // 覆盖默认的action失败后缀
  failSuffix?: string;
  // 覆盖默认的action取消后缀
  cancelSuffix?: string;
  /* response转换配置 */
  /* 针对response的设置都将反应在后缀为_SUCCESS的action.payload中 */
  // 对response的变换函数
  transformResponse?: (response: object, action: Action) => object;
  // 是否将请求参数注入response中
  injectRequestData?: boolean;
  /* 如果你传入了以下两个设置并且都设置为true，我们将以[最后一个]enableXXXCase..作为最终配置 */
  // 是否将response进行camelCase转换: a_b -> aB
  enableCamelCaseResponse?: boolean;
  // 是否将response进行KebabCase转换: map_to_xxx -> MapToXxx
  enableSnakeCaseResponse?: boolean;
}

export interface RequestAction extends Action {
  REQUEST: Request;
}

export interface ErrorAction extends Action {
  error: RequestError;
}

export const isRequestAction = (action: Action): action is RequestAction => {
  return !!action[REQUEST];
};
