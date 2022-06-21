export interface Todo {
  id: number;
  title: string;
  isComplete: boolean;
  isEditing?: boolean;
}

export interface TodoState {
  todos: Array<Todo>;
  setTodos: (todos: Array<Todo>) => void;
  filterName: string;
  setFilterName: (filterName: string) => void;
}
