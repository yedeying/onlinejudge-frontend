export const FETCH = 'FETCH_';
export const SUFFIX = {
  START: '_START',
  SUCCESS: '_SUCCESS',
  FAIL: '_FAIL',
  CANCEL: '_CANCEL'
};

const _emptyObj = {};

export function decorateActionType(type: string, withPrefix: boolean = true): { [key: string]: string } {
  if (typeof type !== 'string') {
    throw Error('type should be string');
  }
  if (!type) {
    return _emptyObj;
  }
  const PREFIX = withPrefix ? FETCH : '';
  return {
    [`${PREFIX}${type}`]: `${PREFIX}${type}`,
    [`${PREFIX}${type}${SUFFIX.START}`]: `${PREFIX}${type}${SUFFIX.START}`,
    [`${PREFIX}${type}${SUFFIX.SUCCESS}`]: `${PREFIX}${type}${SUFFIX.SUCCESS}`,
    [`${PREFIX}${type}${SUFFIX.FAIL}`]: `${PREFIX}${type}${SUFFIX.FAIL}`
  };
}
