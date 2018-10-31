import { Action } from 'redux';

export interface PayloadAction extends Action {
  payload: any;
}
