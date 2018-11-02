import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Action, AppState } from '../types';
import { rootReducer } from '../reducers/root';
import { rootEpic } from '../epics/root';
import history from './history';

const router = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware<Action, Action, AppState>();
const composeEnhancers = composeWithDevTools({});

export type AppStore = Store<AppState, Action>;

export default function configureStore(initialState = {}) {
  const middlewares = [
    epicMiddleware,
    router
  ];
  const store: AppStore = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  epicMiddleware.run(rootEpic);

  return store;
}
