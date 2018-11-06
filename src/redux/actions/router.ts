import { Action, Location } from 'history';
import { LOCATION_CHANGE } from 'react-router-redux';

export const onLocationChanged = (location: Location, action: Action) => ({
  type: LOCATION_CHANGE,
  payload: {
    location,
    action
  }
});

/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

export enum HistoryMethod {
  push = 'push',
  replace = 'replace',
  go = 'go',
  goBack = 'goBack',
  goForward = 'goForward'
}

const updateLocation = (method: HistoryMethod) => {
  return (...args: any[]) => ({
    type: CALL_HISTORY_METHOD,
    payload: {
      method,
      args
    }
  });
};

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
export const push = updateLocation(HistoryMethod.push);
export const replace = updateLocation(HistoryMethod.replace);
export const go = updateLocation(HistoryMethod.go);
export const goBack = updateLocation(HistoryMethod.goBack);
export const goForward = updateLocation(HistoryMethod.goForward);

export const routerActions = { push, replace, go, goBack, goForward };
