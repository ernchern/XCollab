export class Discussion {
  id: string;
  title: string;
  body: string;
  concern: string[]; // TODO USER
  summary: string; // TODO SUMMARY
  author: string; // TODO USER
  locked: boolean;
  comments: string[]; // TODO comment
  solved: boolean;
}
