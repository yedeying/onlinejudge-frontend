import axios, { CancelToken, AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { error as errorConst } from '../../constants';

const source = axios.CancelToken.source();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' }
});

interface Cancelable {
  cancel: () => void;
}

export const request = (requestConfig: AxiosRequestConfig): Promise<AxiosResponse> & Cancelable => {
  const requestInstance = axiosInstance.request({
    ...requestConfig,
    cancelToken: source.token
  }).then(
    (response: AxiosResponse) => response,
    (e: AxiosError) => {
      if (e.code === errorConst.StatusCode.LOGIN_REQUIRED) {
        window.location.reload();
      }
      if (axios.isCancel(e)) {
        return;
      }
      return Promise.reject(e);
    }
  );
  return {
    ...requestInstance,
    cancel: () => source.cancel('Operation canceled')
  };
};
