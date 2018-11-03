import aliasCombineReducers from './combineReducers';
import { Map, Record } from 'immutable';
import { Action, ReducerMap } from './types';

interface AnyObject {
  [key: string]: any;
}
export const record = <T extends AnyObject>(plain: T): Record<T> => {
  return Map(plain) as any;
};

export const handleActions = <State>(
  handlers: ReducerMap<State>,
  defaultState: State
) => (state: State | undefined, action: Action) => {
  state = state || defaultState;
  const { type } = action;
  if (handlers[type]) {
    return handlers[type](state, action);
  }
  return state;
};

export const combineReducers = aliasCombineReducers;
