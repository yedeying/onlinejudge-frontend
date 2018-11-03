import { Record as IRecord } from 'immutable';

export const record = <T>(plain: T) => IRecord(plain)();
export interface Record<T> extends IRecord<T> {}
