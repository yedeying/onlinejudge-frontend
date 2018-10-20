import { SUFFIX } from './util';
// import { decorateActionType } from './util';

const actionTypes = {
  // sample: {
  //   SET_SAMPLE: 'SET_SAMPLE',
  //   ...decorateActionType('SET_SAMPLE_REMOTE', false)
  // },
  suffix: SUFFIX,
  prefix: {
    FETCH: 'FETCH_'
  }
};

export { actionTypes };
