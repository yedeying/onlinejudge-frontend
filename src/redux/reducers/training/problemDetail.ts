import { Record } from '$types';
import { IProblemItem } from './problem';

export interface IProblemDetail extends IProblemItem {
  description: string;
  timeLimit: number;
  memoryLimit: number;
  judger: string;
  dataSet: string;
}

export type ProblemDetail = Record<IProblemDetail>;
