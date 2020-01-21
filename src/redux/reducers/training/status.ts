import { Record } from '$types';

export type Status =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'PRESENTATION_ERROR'
  | 'RUNTIME_ERROR'
  | 'COMPILE_ERROR';

export type Language = 'C' | 'CPP';

export interface IStatusItem {
  id: string;
  problemNo: string;
  title: string;
  key: string;
  userId: number;
  username: string;
  usedTime: number;
  usedMemory: number;
  language: Language;
  status: Status;
  createdAt: Date;
  judgedAt: Date;
  updatedAt: Date;
}

export type StatusItem = Record<IStatusItem>;
