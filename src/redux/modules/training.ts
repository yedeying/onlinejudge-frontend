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

export interface ITrainingState {
  readonly problemList: List<IProblemItem>;
}

export const trainingReducer = combineReducers<ITrainingState, TrainingAction>({
  problemList
});
