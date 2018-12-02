import { RouterState, routerReducer } from './router';
import { TrainingState, trainingReducer } from './training';
import { UserState, userReducer } from './user';
import { combineReducers } from '../utils';
import { Record } from '../types';

export interface IApplicationState {
  readonly router: RouterState;
  readonly training: TrainingState;
  readonly user: UserState;
}
export type ApplicationState = Record<IApplicationState>;

export const rootReducer = combineReducers<IApplicationState>({
  router: routerReducer,
  training: trainingReducer,
  user: userReducer
});
