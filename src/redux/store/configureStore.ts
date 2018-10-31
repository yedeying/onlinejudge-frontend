import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '../reducers/root';
import { rootEpic } from '../epics/root';
import history from './history';

const router = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();
const composeEnhancers = composeWithDevTools({});

export default function configureStore(initialState = {}) {
  const middlewares = [
    epicMiddleware,
    router
  ];
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  epicMiddleware.run(rootEpic);

  return store;
}
