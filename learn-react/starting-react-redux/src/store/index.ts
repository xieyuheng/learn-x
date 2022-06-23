import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from '../pages/todos/todoSlice';

export default configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});
