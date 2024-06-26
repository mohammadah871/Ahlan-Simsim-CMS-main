import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import { addTask, removeTask, updateTask } from "./taskSlice";
import { ApiEngin } from "src/constants/methods";

export const getTasks = createAsyncThunk(
  "tasksApp/tasks/getTasks",
  async (id, { dispatch, getState }) => {
    const response = await axios.get(
      ApiEngin +
        "/id" +
        `?programId=${id?.programId}&sessionId=${id?.sessionId}`
    );
    const data = await response.data.data;
    return data;
  }
);

export const getTasksdatiles = createAsyncThunk(
  "getTasksdatiles/getTasksdatiles/getTasksdatiles",
  async (id, { dispatch, getState }) => {
    const response = await axios.get(
      ApiEngin +
        "/datiles" +
        `?programId=${id?.programId}&sessionId=${id?.sessionId}`
    );
    const data = await response.data.data;
    return data;
  }
);

export const reorderList = createAsyncThunk(
  "tasksApp/tasks/reorder",
  async (
    {
      arr,
      destination_order,
      source_order,
      destination_id,
      source_id,
      programId,
      sessionId,
    },
    { dispatch, getState }
  ) => {
    let dataSend = {
      arr: arr,
      destination: destination_order,
      source: source_order,
      destination_id: destination_id,
      source_id: source_id,
      programId: programId,
      sessionId: sessionId,
    };

    const response = await axios.post(ApiEngin + "/reorder", dataSend);
    const data = await response.data;
    dispatch(
      showMessage({
        message: "List Order Saved",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
    );
    return null;
  }
);

const tasksAdapter = createEntityAdapter({});

export const { selectAll: selectTasks, selectById: selectTasksById } =
  tasksAdapter.getSelectors((state) => state.tasksApp.tasks);

export const selectRemainingTasks = createSelector([selectTasks], (tasks) => {
  return tasks?.length;
});

const tasksSlice = createSlice({
  name: "tasksApp/tasks",
  initialState: tasksAdapter.getInitialState(),
  extraReducers: {
    [reorderList.fulfilled]: null,
    [updateTask.fulfilled]: tasksAdapter.upsertOne,
    [addTask.fulfilled]: tasksAdapter.addOne,
    [removeTask.fulfilled]: (state, action) =>
      tasksAdapter.removeOne(state, action.payload),
    [getTasks.fulfilled]: tasksAdapter.setAll,
  },
});

export const { setTasksSearchText } = tasksSlice.actions;

export default tasksSlice.reducer;
