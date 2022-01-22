import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Iuser {
  displayName: string;
  email: string;
  uid: string;
}

interface IuserState {
  user: Iuser;
}

const emptyUser = {
  displayName: "",
  email: "",
  uid: "",
};

// get user from local storage
const storedUser = localStorage.getItem("user");
const user: Iuser = storedUser ? JSON.parse(storedUser) : emptyUser;
const initialState = { user };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<Iuser>) {
      state.user = action.payload;
      return state;
    },
    logoutUser(state) {
      state.user = emptyUser;
    },
  },
});

export const { loginUser, logoutUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;

export default usersSlice.reducer;
