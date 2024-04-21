import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import SectionModel from '../model/SectionModel';
import TaskModel from '../model/TaskModel';
import { ApiEngin } from 'src/constants/methods';

export const getTask = createAsyncThunk(
  'tasksApp/task/getTask',
  async (newIdes, { dispatch, getState }) => {
    try {
      const response = await axios.get(ApiEngin+"/single-id"+`?id=${newIdes?.id}&programId=${newIdes?.programId}&sessionId=${newIdes?.sessionId}`);
      const data = await response.data?.data;
      return data;
    } catch (error) {
      return null;
    }
  }
);

export const addTask = createAsyncThunk(
  'tasksApp/tasks/addTask',
  async (task, { dispatch, getState }) => {
    const response = await axios.post('/api/tasks', task);

    const data = await response.data;

    return data;
  }
);

export const updateTask = createAsyncThunk(
  'tasksApp/tasks/updateTask',
  async (id, { dispatch, getState }) => {
    const response = await axios.put(ApiEngin,id);

    const data = await response.data;

    return data;
  }
);

export const removeTask = createAsyncThunk(
  'tasksApp/tasks/removeTask',
  async (newIdes, { dispatch, getState }) => {
    const response = await axios.delete(ApiEngin+"/id"+`?id=${newIdes?.id}&programId=${newIdes?.programId}&sessionId=${newIdes?.sessionId}`);
    await response.data;
    return id;
  }
);


export const saveUrls = createAsyncThunk(
  'tasksApp/task/saveUrls',
  async (newIdes, { dispatch, getState }) => {
    try {
      const response = await axios.post(ApiEngin+"/saveUrl",newIdes);
      const data = await response.data?.data;
      return data;
    } catch (error) {
      return null;
    }
  }
);


export const selectTask = ({ tasksApp }) => tasksApp.task;

const taskSlice = createSlice({
  name: 'tasksApp/task',
  initialState: null,
  reducers: {
    newTask: (state, action) => {
      const type = action.payload;
      if (type === 'section') {
        return SectionModel();
      }
      if (type === 'task') {
        return TaskModel();
      }
      return null;
    },
    resetTask: () => null,
  },
  extraReducers: {
    [getTask.pending]: (state, action) => null,
    [getTask.fulfilled]: (state, action) => action.payload,
    [updateTask.fulfilled]: (state, action) => action.payload,
    [removeTask.fulfilled]: (state, action) => null,
    [saveUrls.fulfilled]: (state, action) => null,
  },
});

export const { resetTask, newTask } = taskSlice.actions;

export default taskSlice.reducer;
