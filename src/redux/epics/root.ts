import { combineEpics, Epic } from 'redux-observable';
import { Action } from '../types';
import { requestEpic } from './request';

export const rootEpic: Epic<Action> = combineEpics(
  requestEpic
);
