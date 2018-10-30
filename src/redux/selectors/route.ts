import { ApplicationState } from '../modules/root';

export const selectPath = (state: ApplicationState) => {
  return state.getIn(['router', 'location']);
};
