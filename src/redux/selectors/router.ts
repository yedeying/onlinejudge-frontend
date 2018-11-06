import { AppState } from '../types';
import { Location, Pathname } from 'history';

export const selectLocation = (state: AppState): Location => {
  return state.getIn(['router', 'location']);
};

export const selectPathname = (state: AppState): Pathname => {
  return state.getIn(['router', 'location', 'pathname']);
};

export const selectActivePage = (state: AppState): string => {
  return selectPathname(state).split('/').slice(-1)[0];
};
