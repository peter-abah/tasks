import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UIState {
  isSideBarVisible: boolean;
}

const initialState: UIState = {
  isSideBarVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateSideBarVisibility: (state, action: PayloadAction<boolean>) => {
      const isHidden = action.payload;
      state.isSideBarVisible = isHidden;
    },
  }
});

export const { updateSideBarVisibility } = uiSlice.actions;

export const selectSideBarVisibility = (state: RootState) => state.ui.isSideBarVisible;

export default uiSlice.reducer;
