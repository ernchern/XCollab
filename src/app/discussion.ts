export class Discussion {
  author: string; // TODO USER
  title: string;
  body: string;
  summary: string; // TODO SUMMARY
  concerned: number;
  solved: boolean;

  constructor(
    author: string, // TODO USER
    title: string,
    body: string,
  ) {
    this.solved = false;
    this.summary = '';
    this.concerned = 0;
  }
}
