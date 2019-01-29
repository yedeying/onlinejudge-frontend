import { AppState } from '$types';

export const isStatusListLoading = (state: AppState) => state
  .get('status')
  .get('loadingStatusList');
