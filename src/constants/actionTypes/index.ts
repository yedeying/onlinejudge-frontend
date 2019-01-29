import { SUFFIX, FETCH, decorateActionType } from './util';

const actionTypes = {
  training: {
    ...decorateActionType('PAGE_LIST'),
    ...decorateActionType('PROBLEM_LIST'),
    ...decorateActionType('PROBLEM_DETAIL')
  },
  status: {
    ...decorateActionType('STATUS_LIST')
  },
  user: {
    ...decorateActionType('USER_INFO'),
    ...decorateActionType('LOGIN', false),
    ...decorateActionType('LOGOUT', false),
    ...decorateActionType('REGISTER', false)
  },
  common: {
    APP_INIT: 'APP_INIT'
  },
  suffix: SUFFIX,
  prefix: {
    FETCH
  }
};

export { actionTypes };
