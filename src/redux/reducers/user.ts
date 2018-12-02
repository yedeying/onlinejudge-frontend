import { Record } from '$types';
import { actionTypes } from '$constants';
import { handleActions, record } from '../utils';
const { user } = actionTypes;

export enum Role {
  Admin = 'admin',
  Normal = 'normal'
}

export interface IUserInfo {
  username: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
export type UserInfo = Record<IUserInfo>;

export interface IUserState {
  readonly currentUser: UserInfo | null | undefined;
}

export type UserState = Record<IUserState>;

const defaultState = record({
  currentUser: undefined
}) as UserState;

export const userReducer = handleActions<UserState>({
  [user.FETCH_USER_INFO_SUCCESS](state, { payload }) {
    return state
      .set('currentUser', payload.data.logStatus ? record(payload.data.user) : null);
  },
  [user.LOGOUT_SUCCESS](state) {
    return state
      .set('currentUser', null);
  }
}, defaultState);
