import { List } from 'immutable';
import { Record } from '$types';
import { actionTypes } from '$constants';
import { ProblemItem, IProblemItem, PageItem, IPageItem } from './problem';
import { StatusItem, IStatusItem } from './status';
import { ProblemDetail } from './problemDetail';
import { handleActions, record } from '../../utils';
const { common } = actionTypes;

export interface ITrainingState {
  readonly problemList: List<ProblemItem>;
  readonly pageList: List<PageItem>;
  readonly problemDetail: ProblemDetail | null;
  readonly statusList: List<StatusItem>;
  readonly loadingProblemList: boolean;
  readonly loadingProblemDetail: boolean;
  readonly loadingStatusList: boolean;
}
export type TrainingState = Record<ITrainingState>;

const defaultState: TrainingState = record({
  problemList: List(),
  pageList: List(),
  problemDetail: null,
  statusList: List(),
  loadingProblemList: false,
  loadingProblemDetail: false,
  loadingStatusList: false
} as ITrainingState);

export const trainingReducer = handleActions<TrainingState>({
  [common.FETCH_PAGE_LIST_SUCCESS](state, { payload }) {
    return state.set(
      'pageList',
      List(payload.data.map((item: IPageItem) => record(item)))
    );
  },
  [common.FETCH_PROBLEM_LIST_START](state) {
    return state.set('loadingProblemList', true);
  },
  [common.FETCH_PROBLEM_LIST_SUCCESS](state, { payload }) {
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
  [common.FETCH_PROBLEM_DETAIL_START](state) {
    return state.set('loadingProblemDetail', true);
  },
  [common.FETCH_PROBLEM_DETAIL_SUCCESS](state, { payload }) {
    return state
      .set(
        'problemDetail',
        record(payload.data)
      )
      .set('loadingProblemDetail', false);
  },
  [common.FETCH_STATUS_LIST_START](state) {
    return state.set('loadingStatusList', true);
  },
  [common.FETCH_STATUS_LIST_SUCCESS](state, { payload }) {
    return state
      .set(
        'statusList',
        List(payload.data.map((item: IStatusItem) => {
          item.key = item.id;
          item.createdAt = new Date(item.createdAt);
          item.updatedAt = new Date(item.createdAt);
          item.judgedAt = new Date(item.createdAt);
          return record(item);
        }))
      )
      .set('loadingStatusList', false);
  }
}, defaultState);

export * from './problem';
export * from './problemDetail';
export * from './status';
