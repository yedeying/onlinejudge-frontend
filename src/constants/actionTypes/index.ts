import { SUFFIX, FETCH, decorateActionType } from './util';

const actionTypes: { [key: string]: { [key: string]: string } } = {
  training: {
    ...decorateActionType('NO_LIST'),
    ...decorateActionType('PROBLEM_LIST'),
    ...decorateActionType('PROBLEM_DETAIL')
  },
  suffix: SUFFIX,
  prefix: {
    FETCH
  }
};

export { actionTypes };
