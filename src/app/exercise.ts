import { Discussion } from "./discussion"
export class Exercise {
  id: number;
  title: string;
  source: string;
  tags: string[];
  document_url: string;
  discussions: Discussion[];
}
