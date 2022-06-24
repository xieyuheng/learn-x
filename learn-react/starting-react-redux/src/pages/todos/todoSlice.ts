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

function setTodos(state: TodoState, action: { payload: Array<Todo> }) {
  state.todos = action.payload;
}

function setFilterName(state: TodoState, action: { payload: string }) {
  state.filterName = action.payload;
}

function clearCompleted(state: TodoState) {
  state.todos = [...state.todos.filter((todo) => !todo.isComplete)];
}

function checkAll(state: TodoState) {
  state.todos = [...state.todos.map((todo) => ({ ...todo, isComplete: true }))];
}

function deleteTodo(state: TodoState, { payload: id }: { payload: number }) {
  state.todos = [...state.todos.filter((todo) => todo.id !== id)];
}

function completeTodo(state: TodoState, { payload: id }: { payload: number }) {
  state.todos.forEach((todo) => {
    if (todo.id === id) {
      todo.isComplete = !todo.isComplete;
    }
  });
}

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos,
    setFilterName,
    clearCompleted,
    checkAll,
    deleteTodo,
    completeTodo,
  },
});

export const reducer = slice.reducer;

export const actions = slice.actions;

export const selectors = {
  todos: ({ todos }: { todos: TodoState }) => todos.todos,
  filterName: ({ todos }: { todos: TodoState }) => todos.filterName,
  remaining: ({ todos }: { todos: TodoState }) =>
    todos.todos.filter((todo: Todo) => !todo.isComplete).length,
};
