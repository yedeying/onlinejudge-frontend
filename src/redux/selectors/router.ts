import { AppState } from '../types';

export const selectLocation = (state: AppState) => state
  .get('router')
  .get('location');

export const selectPathname = (state: AppState) => state
  .get('router')
  .get('location')
  .get('pathname');

export const selectActivePage = (state: AppState) =>
  selectPathname(state).split('/').slice(-1)[0];

export const selectProblemNo = (state: AppState) =>
  selectPathname(state).split('/').slice(-1)[0];
