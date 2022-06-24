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
    setTodos(state, action) {
      state.todos = action.payload;
    },
    setFilterName(state, action) {
      state.filterName = action.payload;
    },
    clearCompleted(state) {
      state.todos = [...state.todos.filter((todo) => !todo.isComplete)];
    },
  },
});

export const { setTodos, setFilterName, clearCompleted } = todoSlice.actions;

// function checkAll() {
//   dispatch(
//     setTodos([...todos.map((todo) => ({ ...todo, isComplete: true }))])
//   );
// }

export const selectTodos = ({ todos }: { todos: TodoState }) => todos.todos;

export const selectFilterName = ({ todos }: { todos: TodoState }) =>
  todos.filterName;

export const selectRemaining = (state: { todos: TodoState }) => {
  const todos = selectTodos(state);
  return todos.filter((todo: Todo) => !todo.isComplete).length;
};
