import { actionTypes } from '$constants';

export * from './router';
export * from './training';
export * from './user';

export const appInit = () => ({
  type: actionTypes.common.APP_INIT,
  payload: {}
});
