import { Discussion } from "./discussion"
export class Exercise {
  id: string;
  title: string;
  source: string;
  tags: string[];
  document_url: string;
  discussions: Discussion[];
}
