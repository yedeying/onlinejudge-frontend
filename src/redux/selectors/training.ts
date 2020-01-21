import { AppState } from '$types';

export const selectProblemList = (state: AppState) => state
  .get('training')
  .get('problemList');

export const selectPageList = (state: AppState) => state
  .get('training')
  .get('pageList');

export const selectStatusList = (state: AppState) => state
  .get('training')
  .get('statusList');

export const isProblemListLoading = (state: AppState) => state
  .get('training')
  .get('loadingProblemList');

export const isProblemDetailLoading = (state: AppState) => state
  .get('training')
  .get('loadingProblemDetail');

export const selectProblemDetail = (state: AppState) => state
  .get('training')
  .get('problemDetail');

export const isStatusListLoading = (state: AppState) => state
  .get('training')
  .get('loadingStatusList');
