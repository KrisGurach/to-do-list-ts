import { Task } from '@/interfaces/Task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TasksState {
  value: Task[];
}

const initialState: TasksState = {
  value: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.value = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.value.unshift(action.payload);
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.value.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.value = state.value.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;