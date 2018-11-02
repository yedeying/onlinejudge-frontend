import { RouterState, routerReducer } from './router';
import { TrainingState, trainingReducer } from './training';
import { Record } from '../utils';
import combineReducers from '../combineReducers';

export interface IApplicationState {
  readonly router: RouterState;
  readonly training: TrainingState;
}
export type ApplicationState = Record<IApplicationState>;

export const rootReducer = combineReducers<IApplicationState>({
  router: routerReducer,
  training: trainingReducer
});
