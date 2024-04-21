import { combineReducers } from '@reduxjs/toolkit';
import tasks from './tasksSlice';
import task from './taskSlice';

const reducer = combineReducers({
  tasks,
  task,
});

export default reducer;
