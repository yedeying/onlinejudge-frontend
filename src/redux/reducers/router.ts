import { LOCATION_CHANGE } from 'react-router-redux';
import { record } from '../utils';
import { Action, Record } from '../types';
import { Location as ILocation } from 'history';

export type Location = Record<ILocation>;

const defaultLocation: ILocation = {
  pathname: location.pathname,
  search: location.search,
  hash: location.hash,
  state: ''
};

export interface IRouterState {
  readonly location: Location;
  readonly action: string | null;
}
export type RouterState = Record<IRouterState>;

const defaultRouter: IRouterState = {
  location: record(defaultLocation),
  action: null
};

const defaultRouterState: RouterState = record(defaultRouter);

export const routerReducer = (state: RouterState = defaultRouterState, { type, payload }: Action) => {
  if (type === LOCATION_CHANGE) {
    return state.set('location', record(payload.location || payload));
  }
  return state;
};
