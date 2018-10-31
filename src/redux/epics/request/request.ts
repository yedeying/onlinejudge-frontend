import { Observable, Observer } from 'rxjs';
import { Epic } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';
import { RequestConfig, Response, RequestError, Action, RequestAction, isRequestAction } from '../../types';
import { requestActions } from './utils';
import { REQUEST } from '../../../constants/common';
import { Method } from '../../../constants/apiUrls';
import { request } from '../../../services/api';

export const fetchRequest = (action: RequestAction) => new Observable((observer: Observer<Action>) => {
  const requestOption: RequestConfig = action[REQUEST];

  const requestConfig = {
    method: Method.GET,
    ...requestOption
  };
  observer.next(requestActions.start(action));
  request(requestConfig)
    .then((response: Response) => {
      observer.next(requestActions.success(action, response));
      observer.complete();
    })
    .catch((e: RequestError) => {
      observer.next(requestActions.fail(action, e));
    });
  return () => requestActions.cancel(action);
});

export const requestEpic: Epic<Action> = (action$: Observable<Action>) => action$.pipe(
  filter((action: Action) => isRequestAction(action)),
  switchMap((action: RequestAction) => {
    return fetchRequest(action);
  })
);
