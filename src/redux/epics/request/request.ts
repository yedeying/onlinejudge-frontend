import { Action } from 'redux';
import { Observable, Observer } from 'rxjs';
import { Epic } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';
import { PayloadAction } from '../../types';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { isRequestAction, requestActions } from './utils';
import { REQUEST } from '../../../constants/common';
import { Method } from '../../../constants/apiUrls';
import { request } from '../../../services/api';

export const fetchRequest = (action: PayloadAction) => new Observable((observer: Observer<PayloadAction>) => {
  const requestOption: AxiosRequestConfig = action[REQUEST];
  const { url } = requestOption;
  const method = requestOption.method || Method.GET;

  const requestConfig = {
    method: Method.GET,
    ...requestOption
  };
  observer.next(requestActions.start(action));
  const requestInstance = request(requestConfig)
    .then((response: AxiosResponse) => {
      observer.next(response);
      observer.complete();
    })
    .catch((e: AxiosError) => {
      observer.error(e);
    });
  return () => requestInstance.cancel();
});

export const requestEpic: Epic<PayloadAction> = (action$: Observable<PayloadAction>) => action$.pipe(
  filter((action: PayloadAction) => isRequestAction(action)),
  switchMap((action: PayloadAction) => {
    return fetchRequest(action);
  })
);
