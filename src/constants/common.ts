export const DEFERRED = Symbol('DEFERRED');

export const REQUEST = 'REQUEST';

export enum StatusMap {
  uninitialized = 'uninitialized',
  loading = 'loading',
  loaded = 'loaded',
  failed = 'failed',
}
