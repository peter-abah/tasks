import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UIState {
  isSideBarVisible: boolean;
  isAppLoading: boolean;
  isLoading: boolean;
}

const initialState: UIState = {
  isSideBarVisible: false,
  isAppLoading: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateSideBarVisibility(state, action: PayloadAction<boolean>) {
      state.isSideBarVisible = action.payload;
      return state;
    },
    updateAppLoading(state, action: PayloadAction<boolean>) {
      state.isAppLoading = action.payload;
      return state;
    },
    updateLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      return state;
    },
  },
});

export const { updateSideBarVisibility, updateAppLoading, updateLoading } =
  uiSlice.actions;

export const selectSideBarVisibility = (state: RootState) =>
  state.ui.isSideBarVisible;

export const selectAppLoading = (state: RootState) => state.ui.isAppLoading;

export const selectIsLoading = (state: RootState) => state.ui.isLoading;

export default uiSlice.reducer;
