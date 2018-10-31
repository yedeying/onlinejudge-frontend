import { SUFFIX, FETCH, decorateActionType } from './util';

const actionTypes: { [key: string]: { [key: string]: string } } = {
  training: {
    ...decorateActionType('TRAINING_NO_LIST'),
    ...decorateActionType('PROBLEM_LIST')
  },
  suffix: SUFFIX,
  prefix: {
    FETCH
  }
};

export { actionTypes };
