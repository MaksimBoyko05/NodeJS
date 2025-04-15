import { Todo } from "../types/Todo";
import { TodoRepository } from "./TodoRepository";

const STORAGE_KEY = "todos";

export class LocalStorageTodoRepository implements TodoRepository {
  async getAll(): Promise<Todo[]> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  async getById(id: string): Promise<Todo | null> {
    const todos = await this.getAll();
    return todos.find(todo => todo.id === id) || null;
  }

  async create(todo: Todo): Promise<void> {
    const todos = await this.getAll();
    todos.push(todo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  async update(updatedTodo: Todo): Promise<void> {
    const todos = await this.getAll();
    const updatedTodos = todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
  }

  async delete(id: string): Promise<void> {
    const todos = await this.getAll();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTodos));
  }
}
