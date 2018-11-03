import { LOCATION_CHANGE } from 'react-router-redux';
import { record } from '../utils';
import { Action, Record } from '../types';

export interface IRouterState {
  readonly location: Location | null;
  readonly action: string | null;
}
export type RouterState = Record<IRouterState>;

const defaultRouter: IRouterState = {
  location: null,
  action: null
};

const defaultRouterState: RouterState = record(defaultRouter);

export const routerReducer = (state: RouterState = defaultRouterState, { type, payload }: Action) => {
  if (type === LOCATION_CHANGE) {
    return state.set('location', payload.location || payload);
  }
  return state;
};
