import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    todos: require('../pages/todos/todoSlice').reducer,
  },
});
