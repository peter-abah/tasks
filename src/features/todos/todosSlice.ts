import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string,
  projectId: string,
  title: string,
  description: string,
  priority: string,
  dueDate: string,
};

export type TodosState = Todo[];

const initialState: TodosState = [];

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Adds a new todo or updates an existing code
    update: (state, action: PayloadAction<Todo>) => {
      const todo = action.payload;

      // filters todo from state if its exists (existing todo)
      const filtered = state.filter(({ id }) => id !== todo.id);
      return [...filtered, todo];
    },

    remove: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((todo) => todo.id !== id);
    },
  },
});

export const { update, remove } = todosSlice.actions;

export default todosSlice.reducer;
