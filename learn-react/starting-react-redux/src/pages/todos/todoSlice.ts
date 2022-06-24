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

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos,
    setFilterName,
    clearCompleted,
    checkAll,
  },
});

export const actions = slice.actions;
export const reducer = slice.reducer;

export const selectTodos = ({ todos }: { todos: TodoState }) => todos.todos;

export const selectFilterName = ({ todos }: { todos: TodoState }) =>
  todos.filterName;

export const selectRemaining = (state: { todos: TodoState }) => {
  const todos = selectTodos(state);
  return todos.filter((todo: Todo) => !todo.isComplete).length;
};
