import { Map } from 'immutable';
import { ActionType } from 'typesafe-actions';
import { LOCATION_CHANGE } from 'react-router-redux';

export interface IRouterState {
  readonly location: Location | null;
  readonly action: string | null;
}

export type RouterState = Map<string, any>;

export type RouterAction = ActionType<any>;

const initialState: RouterState = Map({
  location: null,
  action: null
});

export const routerReducer = (state: RouterState = initialState, { type, payload }: RouterAction) => {
  if (type === LOCATION_CHANGE) {
    return state.set('location', payload.location || payload);
  }
  return state;
};
