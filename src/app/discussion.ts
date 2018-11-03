export class Discussion {
  author: string; // TODO USER
  title: string;
  body: string;
  summary: string; // TODO SUMMARY
  solved: boolean;

  constructor(
    author: string, // TODO USER
    title: string,
    body: string,
  ) {
    this.solved = false;
    this.summary = '';
  }
}
