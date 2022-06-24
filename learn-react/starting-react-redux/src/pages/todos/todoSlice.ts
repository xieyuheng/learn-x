import { createSlice } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  title: string;
  isComplete: boolean;
  isEditing?: boolean;
}

export interface TodoState {
  todos: Array<Todo>;
  filterName: string;
  todoInput: string;
}

const initialState: TodoState = {
  todos: [],
  filterName: 'all',
  todoInput: '',
};

function setTodos(state: TodoState, todos: Array<Todo>) {
  state.todos = todos;
}

function setFilterName(state: TodoState, filterName: string) {
  state.filterName = filterName;
}

function setTodoInput(state: TodoState, todoInput: string) {
  state.todoInput = todoInput;
}

function clearCompleted(state: TodoState) {
  state.todos = [...state.todos.filter((todo) => !todo.isComplete)];
}

function checkAll(state: TodoState) {
  state.todos = [...state.todos.map((todo) => ({ ...todo, isComplete: true }))];
}

function deleteTodo(state: TodoState, id: number) {
  state.todos = [...state.todos.filter((todo) => todo.id !== id)];
}

function completeTodo(state: TodoState, id: number) {
  state.todos.forEach((todo) => {
    if (todo.id === id) {
      todo.isComplete = !todo.isComplete;
    }
  });
}

function editingTodo(state: TodoState, id: number) {
  state.todos.forEach((todo) => {
    if (todo.id === id) {
      todo.isEditing = true;
    }
  });
}

function updateTodo(state: TodoState, id: number, title: string) {
  state.todos.forEach((todo) => {
    if (todo.id === id) {
      todo.isEditing = false;
      if (title.trim() !== '') {
        todo.title = title;
      }
    }
  });
}

function freshId(todos: Array<Todo>): number {
  const ids = todos.map((todo) => todo.id);
  if (ids.length === 0) return 0;
  return Math.max(...ids) + 1;
}

function addTodo(state: TodoState): void {
  if (!state.todoInput.trim()) return;
  const newTodo = {
    id: freshId(state.todos),
    title: state.todoInput,
    isComplete: false,
  };

  setTodos(state, [newTodo, ...state.todos]);
  setTodoInput(state, '');
}

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: prepareReducers({
    setTodos,
    setFilterName,
    setTodoInput,
    clearCompleted,
    checkAll,
    deleteTodo,
    completeTodo,
    editingTodo,
    updateTodo,
    addTodo,
  }),
});

export const reducer = slice.reducer;

export const actions: any = slice.actions;

export const selectors = {
  todos: ({ todos }: { todos: TodoState }) => todos.todos,
  filterName: ({ todos }: { todos: TodoState }) => todos.filterName,
  todoInput: ({ todos }: { todos: TodoState }) => todos.todoInput,
  remaining: ({ todos }: { todos: TodoState }) =>
    todos.todos.filter((todo: Todo) => !todo.isComplete).length,
  todosFiltered: ({ todos }: { todos: TodoState }) => {
    switch (todos.filterName) {
      case 'active':
        return todos.todos.filter((todo) => !todo.isComplete);
      case 'completed':
        return todos.todos.filter((todo) => todo.isComplete);
      case 'all':
      default:
        return todos.todos;
    }
  },
};

function prepare(f: any): any {
  return {
    prepare(...args: any[]) {
      return { payload: args };
    },
    reducer(state: any, action: any) {
      return f(state, ...action.payload);
    },
  };
}

function prepareReducers(reducers: any): any {
  const results: any = {};
  for (const [name, reducer] of Object.entries(reducers)) {
    results[name] = prepare(reducer);
  }

  return results;
}
