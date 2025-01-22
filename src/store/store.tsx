import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

store.subscribe(() => {
  const tasks = store.getState().tasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));
})

export default store;