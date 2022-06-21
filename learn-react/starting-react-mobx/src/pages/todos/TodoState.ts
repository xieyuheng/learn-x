import { makeAutoObservable } from 'mobx';

export interface Todo {
  id: number;
  title: string;
  isComplete: boolean;
  isEditing?: boolean;
}

export class TodoState {
  todos: Array<Todo> = [];
  filterName: string = 'all';
  todoInput: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  checkAll() {
    for (const todo of this.todos) {
      todo.isComplete = true;
    }
  }

  clearCompleted() {
    this.todos = [...this.todos.filter(todo => !todo.isComplete)];
  }

  remaining() {
    return this.todos.filter(todo => !todo.isComplete).length;
  }

  addTodo(): void {
    if (!this.todoInput.trim()) {
      return;
    }

    const newTodo = {
      id: this.freshId(),
      title: this.todoInput,
      isComplete: false,
    };

    this.todos.unshift(newTodo);
    this.todoInput = '';
  }

  private freshId() {
    const ids = this.todos.map(todo => todo.id);
    if (ids.length === 0) return 0;
    return Math.max(...ids) + 1;
  }

  get todosFiltered() {
    switch (this.filterName) {
      case 'active':
        return this.todos.filter(todo => !todo.isComplete);
      case 'completed':
        return this.todos.filter(todo => todo.isComplete);
      case 'all':
      default:
        return this.todos;
    }
  }
}
