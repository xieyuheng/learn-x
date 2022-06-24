import { configureStore } from '@reduxjs/toolkit';
import * as todos from '../pages/todos/todoSlice';

export default configureStore({
  reducer: {
    todos: todos.slice.reducer,
  },
});
