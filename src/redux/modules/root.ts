import { Reducer } from 'redux';
import { combineReducers } from 'redux-immutable';
import { combineEpics } from 'redux-observable';
import { routerReducer, RouterState } from 'react-router-redux';
import { trainingReducer, TrainingState } from './training';

export const rootEpic = combineEpics();

export interface ApplicationState {
  readonly router: RouterState;
  readonly training: TrainingState;
}

export const rootReducer: Reducer<ApplicationState> = combineReducers({
  router: routerReducer,
  training: trainingReducer
});
