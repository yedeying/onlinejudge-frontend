import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { ActionType } from 'typesafe-actions';
import { RouterState, routerReducer } from './router';
import { trainingReducer, ITrainingState } from './training';

export interface IApplicationState {
  readonly router: RouterState;
  readonly training: ITrainingState;
}

export interface IRouterState {
  readonly location: Location | null;
}

export type ApplicationState = Map<string, any>;

export type RootAction = ActionType<{}>;

export const rootReducer = combineReducers<IApplicationState, RootAction>({
  router: routerReducer,
  training: trainingReducer
});
