import { User } from './user';

export class Discussion {
  author: string; // TODO USER
  title: string;
  body: string;
  summary: string;
  summaryAuthorUID: string;
  concerned: string[];
  solved: boolean;
  id: string;

  constructor(
    author: string, // TODO USER
    title: string,
    body: string,
  ) {
    this.solved = false;
    this.summary = '';
    this.concerned = [];
  }
}
