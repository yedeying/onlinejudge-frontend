import { AppState } from '../types';

export const selectProblemList = (state: AppState) => state
  .get('training')
  .get('problemList');

export const selectProblemNoList = (state: AppState) => state
  .get('training')
  .get('problemNoList');

export const isProblemListLoading = (state: AppState) => state
  .get('training')
  .get('loadingProblemList');

export const isProblemDetailLoading = (state: AppState) => state
  .get('training')
  .get('loadingProblemDetail');

export const selectProblemDetail = (state: AppState) => state
  .get('training')
  .get('problemDetail');
