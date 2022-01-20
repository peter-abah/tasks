import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Iuser {
  name: string;
  email: string;
}

interface IuserState {
  user?: Iuser;
}

const initialState: IuserState = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<Iuser>) {
      state.user = action.payload;
      return state;
    },
    logoutUser(state) {
      delete state.user;
      return state;
    }
  },
});

export const { loginUser, logoutUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;

export default usersSlice.reducer;
