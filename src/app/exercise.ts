import { Discussion } from "./discussion"
export class Exercise {
  title: string;
  source: string;
  tags: string[];
  body: string;
  pondering: string[];
  discussions: Discussion[];
}
