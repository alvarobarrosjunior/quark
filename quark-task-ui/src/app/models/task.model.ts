import { Priority } from './priority.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  owner: string;
  deadline: string;
  priority: Priority;
}
