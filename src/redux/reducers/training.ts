import { Reducer } from 'redux';
import { List } from 'immutable';
import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux-immutable';
// import { handleActions } from 'redux-actions';

export interface IProblemItem {
  id: number;
  no: string;
  title: string;
}

export interface IProblemNoItem {
  id: string;
  title: string;
}

// mock 数据
const mockProblemItem: IProblemItem = {
  id: 101,
  no: 'A00',
  title: 'A + B'
};

export type TrainingAction = ActionType<{}>;

// const problemList = handleActions<List<IProblemItem>, TrainingAction>({}, List([mockProblemItem]));
const problemList: Reducer<List<IProblemItem>, TrainingAction> = () => {
  return List([mockProblemItem]);
};

const problemNoList: Reducer<List<IProblemNoItem>, TrainingAction> = () => {
  return List([
    { id: 'A', title: 'A' },
    { id: 'B', title: 'B' },
    { id: 'C', title: 'C' }
  ]);
};

export interface ITrainingState {
  readonly problemList: List<IProblemItem>;
  readonly problemNoList: List<IProblemNoItem>;
}

export const trainingReducer = combineReducers<ITrainingState, TrainingAction>({
  problemList,
  problemNoList
});
