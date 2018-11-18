import { Observable, Observer } from 'rxjs';
import { Epic } from 'redux-observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import { RequestConfig, Response, RequestError, Action, RequestAction, isRequestAction } from '$types';
import { requestActions } from './utils';
import { common } from '$constants';
import { Method } from '$constants/apiUrls';
import { request } from '$services/api';

export const fetchRequest = (action: RequestAction) => new Observable((observer: Observer<Action>) => {
  const requestOption: RequestConfig = action[common.REQUEST];

  const requestConfig = {
    method: Method.GET,
    ...requestOption
  };
  request(requestConfig)
    .then((response: Response) => {
      observer.next(requestActions.success(action, response));
      observer.complete();
    })
    .catch((e: RequestError) => {
      observer.next(requestActions.fail(action, e));
      observer.complete();
    });
  // return () => requestActions.cancel(action);
});

export const startRequestEpic: Epic<Action> = (action$: Observable<Action>) => action$.pipe(
  filter((action: Action): action is RequestAction => isRequestAction(action)),
  map((action: RequestAction) => requestActions.start(action))
);

export const requestEpic: Epic<Action> = (action$: Observable<Action>) => action$.pipe(
  filter((action: Action): action is RequestAction => isRequestAction(action)),
  mergeMap((action: RequestAction) => {
    return fetchRequest(action);
  })
);
