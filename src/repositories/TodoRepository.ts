import { Todo } from "../types/Todo";

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo | null>;
  create(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  delete(id: string): Promise<void>;
}
