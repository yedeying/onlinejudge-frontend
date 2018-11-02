import { Reducer } from 'redux';
import { Record } from 'immutable';
import { Action } from './types';
import { record } from '$utils';

type RouterMap<T> = {
  [K in keyof T]: Reducer<T[K], Action>;
};

const combineReducers = function <IReducerState>(reducers: RouterMap<IReducerState>) {
  return (state: Record<IReducerState> | undefined, action: Action): Record<IReducerState> => {
    if (!state) {
      // 运行过程中state会出现key无值的情况，故并非完美的Record<IReducerState>
      // 但为避免业务做太多非空判断，此处通过any来保持state完整
      return record({}) as any;
    }
    return state
      .withMutations(temporaryState => {
        const reducerNames = Object.keys(reducers) as (keyof IReducerState)[];
        for (const reducerName of reducerNames) {
          const reducer = reducers[reducerName];
          const currentState = temporaryState.get(reducerName);
          const nextState = reducer(currentState, action);
          temporaryState.set(reducerName, nextState);
        }
      });
  };
};

export default combineReducers;
