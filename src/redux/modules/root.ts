import { combineReducers, Reducer } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer, RouterState } from 'react-router-redux';

export const rootEpic = combineEpics();

export interface ApplicationState {
  readonly router: RouterState;
}

export const rootReducer: Reducer<ApplicationState> = combineReducers({
  router: routerReducer
});
