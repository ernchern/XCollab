import { User } from './user';

export class Discussion {
  author: string; // TODO USER
  title: string;
  body: string;
  summary: string; // TODO SUMMARY
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
