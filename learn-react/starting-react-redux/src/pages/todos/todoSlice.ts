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
}

const initialState: TodoState = {
  todos: [],
  filterName: 'all',
};

function setTodos(state: TodoState, todos: Array<Todo>) {
  state.todos = todos;
}

function setFilterName(state: TodoState, filterName: string) {
  state.filterName = filterName;
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

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: prepareReducers({
    setTodos,
    setFilterName,
    clearCompleted,
    checkAll,
    deleteTodo,
    completeTodo,
    editingTodo,
  }),
});

export const reducer = slice.reducer;

export const actions: any = slice.actions;

export const selectors = {
  todos: ({ todos }: { todos: TodoState }) => todos.todos,
  filterName: ({ todos }: { todos: TodoState }) => todos.filterName,
  remaining: ({ todos }: { todos: TodoState }) =>
    todos.todos.filter((todo: Todo) => !todo.isComplete).length,
};
