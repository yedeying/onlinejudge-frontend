import { ApplicationState } from '../modules/root';
export const selectProblemList = (state: ApplicationState) => {
  return state.getIn(['training', 'problemList']);
};
