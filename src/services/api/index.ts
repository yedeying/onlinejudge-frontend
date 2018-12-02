import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { error as errorConst } from '$constants';

const source = axios.CancelToken.source();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '',
  withCredentials: true
});

// interface Cancelable {
//   cancel: () => void;
// }

export const request = (requestConfig: AxiosRequestConfig): Promise<AxiosResponse> => {
  const requestInstance = axiosInstance.request({
    ...requestConfig,
    cancelToken: source.token
  }).then(
    (response: AxiosResponse) => {
      return response;
    },
    (e: AxiosError) => {
      if (e.code === errorConst.StatusCode.LOGIN_REQUIRED) {
        window.location.reload();
      }
      if (axios.isCancel(e)) {
        return Promise.reject(e);
      }
      return Promise.reject(e);
    }
  );
  return requestInstance;
};
