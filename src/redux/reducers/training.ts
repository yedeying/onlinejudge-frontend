import { Reducer } from 'redux';
import { List, Map } from 'immutable';
import { Action } from '../types';
import { record, Record } from '../utils';
import combineReducers from '../combineReducers';
// import { handleActions } from 'redux-actions';

export interface IProblemItem {
  id: number;
  key?: number;
  no: string;
  title: string;
}
export type ProblemItem = Record<IProblemItem>;

export interface IProblemNoItem {
  id: string;
  title: string;
}
export type ProblemNoItem = Record<IProblemNoItem>;

// const problemList = handleActions<List<IProblemItem>, TrainingAction>({}, List([mockProblemItem]));
const problemList: Reducer<List<ProblemItem>, Action> = () => {
  return List([
    Map({ id: 101, no: 'A00', title: 'A + B' }) as any
    // record({ id: 101, no: 'A00', title: 'A + B', key: undefined })
  ]);
};

const problemNoList: Reducer<List<ProblemNoItem>, Action> = () => {
  return List([
    record({ id: 'A', title: 'A' }),
    record({ id: 'B', title: 'B' }),
    record({ id: 'C', title: 'C' })
  ]);
};

export interface ITrainingState {
  readonly problemList: List<ProblemItem>;
  readonly problemNoList: List<ProblemNoItem>;
}
export type TrainingState = Record<ITrainingState>;

export const trainingReducer = combineReducers<ITrainingState>({
  problemList,
  problemNoList
});
