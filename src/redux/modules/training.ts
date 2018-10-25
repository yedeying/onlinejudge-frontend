export interface ProblemItem {
  id: number;
  no: string;
  title: string;
}

export interface TrainingState {
  readonly problemList: ProblemItem[];
}

export const traningReducer: Reducer<TrainingState> = combineReducers({
  problemList: []
});
