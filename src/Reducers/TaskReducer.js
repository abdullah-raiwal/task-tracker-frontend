import { createSlice } from "@reduxjs/toolkit";
import { data } from "../Data";

export const TaskSlice = createSlice({
  name: "users",
  initialState: { value: data },
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.value = state.value.filter(
        (task) => task.item !== action.payload.item
      );
    },
  },
});


export const { addTask, deleteTask } = TaskSlice.actions;

export default TaskSlice.reducer;

