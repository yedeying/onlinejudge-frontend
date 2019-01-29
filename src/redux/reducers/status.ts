import { Record } from '$types';
import { List } from 'immutable';
import { record, handleActions } from '../utils';
import { actionTypes } from '$constants';

const { status } = actionTypes;

export interface ISubmissionItem {
  id: number;
  key?: number;
  no: string;
  title: string;
  status: string;
  user: string;
  userId: number;
  language: string;
  cpu: string;
  memory: string;
  codeLength: string;
  time: Date;
}
export type SubmissionItem = Record<ISubmissionItem>;

export interface IStatusFilter {
  title: string;
  userName: string;
  status: string;
}
export type StatusFilter = Record<IStatusFilter>;

const defaultStatusFilter: StatusFilter = record({
  title: '',
  userName: '',
  status: ''
});

export interface IStatusState {
  readonly loadingStatusList: boolean;
  readonly statusFilter: StatusFilter;
  readonly statusList: List<SubmissionItem>;
}
export type StatusState = Record<IStatusState>;

const defaultState: StatusState = record({
  loadingStatusList: false,
  statusFilter: defaultStatusFilter,
  statusList: List()
} as IStatusState);

export const statusReducer = handleActions<StatusState>({
  [status.FETCH_STATUS_LIST_START](state) {
    return state.set('loadingStatusList', true);
  },
  [status.FETCH_STATUS_LIST_SUCCESS](state, { payload }) {
    return state
      .set(
        'statusList',
        List(payload.data.map((item: ISubmissionItem) => {
          item.key = item.id;
          return record(item);
        }))
      )
      .set('loadingStatusList', false);
  }
}, defaultState);
