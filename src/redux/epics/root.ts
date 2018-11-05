import { combineEpics, Epic } from 'redux-observable';
import { Action } from '../types';
import { startRequestEpic, requestEpic } from './request';

export const rootEpic: Epic<Action> = combineEpics(
  startRequestEpic,
  requestEpic
);
