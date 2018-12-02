import { Observable, NEVER } from 'rxjs';
import { tap, mergeMap, mapTo } from 'rxjs/operators';
import { Action } from '$types';
import { actionTypes } from '$constants';
import { ofType, combineEpics } from 'redux-observable';
import { message } from 'antd';
import history from '$store/history';
import { Path } from '$constants/route';
import { fetchUser } from '$actions/user';

export const fetchUserEpic = (action$: Observable<Action>) => action$.pipe(
  ofType(actionTypes.common.APP_INIT),
  mapTo(fetchUser())
);

export const loginFailedEpic = (action$: Observable<Action>) => action$.pipe(
  ofType(actionTypes.user.LOGIN_FAIL),
  tap(action => {
    message.warning(action.payload.message || 'login failed');
  }),
  mergeMap(() => NEVER)
);

export const loginSuccessEpic = (action$: Observable<Action>) => action$.pipe(
  ofType(actionTypes.user.LOGIN_SUCCESS),
  tap(() => history.push(Path.ROOT)),
  mapTo(fetchUser())
);

export const userEpic = combineEpics(
  fetchUserEpic,
  loginFailedEpic,
  loginSuccessEpic
);
