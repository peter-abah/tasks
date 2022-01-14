import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UIState {
  isTodoFormHidden: boolean;
}

const initialState: UIState = {
  isTodoFormHidden: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateTodoFormHidden: (state, action: PayloadAction<boolean>) => {
      const isHidden = action.payload;
      state.isTodoFormHidden = isHidden;
    },
  }
});

export const { updateTodoFormHidden } = uiSlice.actions;

export const selectTodoFormHidden = (state: RootState) => state.ui.isTodoFormHidden;

export default uiSlice.reducer;
