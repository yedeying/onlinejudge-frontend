module.exports = {
  extends: [
    'standard-ye'
  ],
  // eslint currently not support extends in overrids, so that use this hacking
  overrides: Object.assign({
    files: ['**/*.ts', '**/*.tsx'],
  }, require('eslint-config-standard-ye-ts'))
};
