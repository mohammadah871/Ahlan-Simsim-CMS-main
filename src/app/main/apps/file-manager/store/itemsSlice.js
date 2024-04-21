import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEngin } from "src/constants/methods";

export const getItems = createAsyncThunk(
  "fileManagerApp/items/getItems",
  async (folderId) => {
    const response = await axios.get(
      ApiEngin +
        `/file-manager?folderId=${folderId == undefined ? null : folderId}`
    );
    const data = response.data?.data;
    console.log("dataApi", data);

    return { items: data, path: response.data?.path };
  }
);

const itemsAdapter = createEntityAdapter({});

export const {
  selectAll: selectItems,
  selectEntities: selectItemsEntities,
  selectById: selectItemById,
} = itemsAdapter.getSelectors((state) => state.fileManagerApp.items);

const itemsSlice = createSlice({
  name: "fileManagerApp/items",
  initialState: itemsAdapter.getInitialState({
    selectedItemId: null,
    path: [],
  }),
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItemId = action.payload;
    },
  },
  extraReducers: {
    [getItems.fulfilled]: (state, action) => {
      const { items, path } = action.payload;
      itemsAdapter.setAll(state, items);
      state.path = path;
      state.selectedItemId = null;
    },
  },
});

export const selectFolders = createSelector([selectItems], (items) => {
  return items.filter((item) => item.type === "folder");
});

export const selectFiles = createSelector([selectItems], (items) => {
  return items.filter((item) => item.type !== "folder");
});

export const selectSelectedItem = ({ fileManagerApp }) =>
  fileManagerApp.items.selectedItemId;

export const selectPath = ({ fileManagerApp }) => fileManagerApp.items.path;

export const { setSelectedItem } = itemsSlice.actions;

export default itemsSlice.reducer;
