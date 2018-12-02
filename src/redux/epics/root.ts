import { combineEpics } from 'redux-observable';
import { startRequestEpic, requestEpic } from './request';
import { userEpic } from './user';

export const rootEpic = combineEpics(
  startRequestEpic,
  requestEpic,
  userEpic
);
