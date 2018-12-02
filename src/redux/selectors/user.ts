import { AppState } from '$types';

export const selectCurrentUser = (state: AppState) => state
  .get('user')
  .get('currentUser');

export const isLogin = (state: AppState) => Boolean(state
  .get('user')
  .get('currentUser'));
