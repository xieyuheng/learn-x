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

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setFilterName: (state, action) => {
      state.filterName = action.payload;
    },
  },
});

export const { setTodos, setFilterName } = todoSlice.actions;

export const selectTodos = ({ todos }: { todos: TodoState }) => todos.todos;

export const selectFilterName = ({ todos }: { todos: TodoState }) =>
  todos.filterName;

export const selectRemaining = (state: { todos: TodoState }) => {
  const todos = selectTodos(state);
  return todos.filter((todo: Todo) => !todo.isComplete).length;
};
