import { List } from 'immutable';
import { Record } from '../types';
import { actionTypes } from '../../constants';
import { handleActions, record } from '../utils';
const { training } = actionTypes;

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

export interface ITrainingState {
  readonly problemList: List<ProblemItem>;
  readonly problemNoList: List<ProblemNoItem>;
}
export type TrainingState = Record<ITrainingState>;

const defaultState: TrainingState = record({
  problemList: List(),
  problemNoList: List()
});

export const trainingReducer = handleActions<TrainingState>({
  [training.FETCH_NO_LIST_SUCCESS](state, { payload }) {
    return state.set(
      'problemNoList',
      List(payload.data.map((item: IProblemNoItem) => record(item)))
    );
  },
  [training.FETCH_PROBLEM_LIST_SUCCESS](state, { payload }) {
    return state.set(
      'problemList',
      List(payload.data.map((item: IProblemItem) => {
        item.key = item.id;
        return record(item);
      }))
    );
  }
}, defaultState);
