import { AppState } from '../types';

export const selectProblemList = (state: AppState) => {
  return state.getIn(['training', 'problemList']);
};

export const selectProblemNoList = (state: AppState) => {
  return state.getIn(['training', 'problemNoList']);
};
