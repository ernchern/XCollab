export class Discussion {
  id: string;
  author: string; // TODO USER
  title: string;
  body: string;
  summary: string; // TODO SUMMARY
  concern: string[]; // TODO USER
  locked: boolean;
  solved: boolean;

  constructor(
    author: string; // TODO USER
    title: string;
    body: string;
  ) {
    this.id = '';
    this.locked = [author];
    this.solved = false;
    this.comments = [];
    this.summary = '';
    this.concern = [];
  }
}
