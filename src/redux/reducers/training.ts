import { List } from 'immutable';
import { Record } from '$types';
import { actionTypes } from '$constants';
import { handleActions, record } from '../utils';
const { training } = actionTypes;

export interface IProblemItem {
  id: number;
  key?: number;
  no: string;
  title: string;
  difficulity?: string;
  tags: string[];
  createAt: Date;
  updatedAt: Date;
}
export type ProblemItem = Record<IProblemItem>;

export interface IPageItem {
  id: string;
  text: string;
}
export type PageItem = Record<IPageItem>;

export interface IProblemDetail extends IProblemItem {
  description: string;
  timeLimit: number;
  memoryLimit: number;
  judger: string;
  dataSet: string;
}

export type ProblemDetail = Record<IProblemDetail>;

export interface ITrainingState {
  readonly problemList: List<ProblemItem>;
  readonly pageList: List<PageItem>;
  readonly problemDetail: ProblemDetail | null;
  readonly loadingProblemList: boolean;
  readonly loadingProblemDetail: boolean;
}
export type TrainingState = Record<ITrainingState>;

const defaultState: TrainingState = record({
  problemList: List(),
  pageList: List(),
  problemDetail: null,
  loadingProblemList: false,
  loadingProblemDetail: false
} as ITrainingState);

export const trainingReducer = handleActions<TrainingState>({
  [training.FETCH_PAGE_LIST_SUCCESS](state, { payload }) {
    return state.set(
      'pageList',
      List(payload.data.map((item: IPageItem) => record(item)))
    );
  },
  [training.FETCH_PROBLEM_LIST_START](state) {
    return state.set('loadingProblemList', true);
  },
  [training.FETCH_PROBLEM_LIST_SUCCESS](state, { payload }) {
    return state
      .set(
        'problemList',
        List(payload.data.map((item: IProblemItem) => {
          item.key = item.id;
          return record(item);
        }))
      )
      .set('loadingProblemList', false);
  },
  [training.FETCH_PROBLEM_DETAIL_START](state) {
    return state.set('loadingProblemDetail', true);
  },
  [training.FETCH_PROBLEM_DETAIL_SUCCESS](state, { payload }) {
    return state
      .set(
        'problemDetail',
        record(payload.data)
      )
      .set('loadingProblemDetail', false);
  }
}, defaultState);
