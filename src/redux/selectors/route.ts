import { AppState } from '../types';

export const selectPath = (state: AppState) => {
  return state.getIn(['router', 'location']);
};
