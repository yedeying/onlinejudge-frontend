import { Record } from '$types';

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
