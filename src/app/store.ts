import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";

import projectsReducer from "../features/projects/projectsSlice";
import uiReducer from "../features/ui/uiSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
    ui: uiReducer,
    users: usersReducer,
  },
});

// save users state to local storage
store.subscribe(() => {
  const user = store.getState().users.user || '';
  window.localStorage.setItem('user', JSON.stringify(user));
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
