import { combineEpics } from 'redux-observable';
import { requestEpic } from './request';

export const rootEpic = combineEpics(
  requestEpic
);
