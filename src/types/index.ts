export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  editing?: boolean;
}