import { Discussion } from "./discussion"
export class Exercise {
  title: string;
  source: string;
  tags: string[];
  document_url: string;
  discussions: Discussion[];
}
