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

export const selectTodos = (state: { todos: TodoState }) => state.todos.todos;
export const selectFilterName = (state: { todos: TodoState }) =>
  state.todos.filterName;
