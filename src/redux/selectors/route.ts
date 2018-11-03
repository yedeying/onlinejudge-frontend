import { AppState } from '../types';

export const selectPath = (state: AppState) => {
  return state.getIn(['router', 'location']);
};

export const selectionActivePage = (state: AppState) => {
  const path = selectPath(state);
  return path.pathname.split('/').slice(-1)[0];
};
