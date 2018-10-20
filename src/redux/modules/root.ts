import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';

export const rootEpic = combineEpics();

export const rootReducer = combineReducers({
  router: routerReducer
});
