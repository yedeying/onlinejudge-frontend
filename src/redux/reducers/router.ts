import { LOCATION_CHANGE } from 'react-router-redux';
import { record, Record } from '../utils';
import { Action } from '../types';

export interface IRouterState {
  readonly location: Location | null;
  readonly action: string | null;
}
export type RouterState = Record<IRouterState>;

const defaultRouterState: RouterState = record({
  location: null,
  action: null
});

export const routerReducer = (state: RouterState = defaultRouterState, { type, payload }: Action) => {
  if (type === LOCATION_CHANGE) {
    return state.set('location', payload.location || payload);
  }
  return state;
};
