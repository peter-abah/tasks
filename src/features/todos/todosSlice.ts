import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Todo {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  completed: boolean;
  [index: string]: string | boolean;
}

interface IcompleteTodoActionPayload {
  id: string;
  completed: boolean;
}

type TpredicateFunc = (todo: Todo) => boolean;

export type TodosState = Todo[];

const initialState: TodosState = [];

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Adds a new todo or updates an existing code
    update(state, action: PayloadAction<Todo>) {
      const todo = action.payload;

      // filters todo from state if its exists (existing todo)
      const filtered = state.filter(({ id }) => id !== todo.id);
      return [...filtered, todo];
    },

    remove(state, action: PayloadAction<string>) {
      const id = action.payload;
      return state.filter((todo) => todo.id !== id);
    },

    updateTodoCompletedStatus(
      state,
      action: PayloadAction<IcompleteTodoActionPayload>
    ) {
      const { id, completed } = action.payload;
      const todo = state.filter((e) => e.id === id)[0];
      todo.completed = completed;
    },

    // removes todos from state that pass the predicate function
    removeIfPredicate(state, action: PayloadAction<TpredicateFunc>) {
      const predicateFunc = action.payload;
      return state.filter(predicateFunc);
    },
  },
});

export const { update, remove, updateTodoCompletedStatus, removeIfPredicate } =
  todosSlice.actions;

export const selectTodosForProject = (state: RootState, projectId: string) => {
  return state.todos.filter((todo) => todo.projectId === projectId);
};

export const selectCompletedTodosForProject = (
  state: RootState,
  projectId: string
) => {
  return state.todos.filter(
    (todo) => todo.projectId === projectId && todo.completed === true
  );
};

export const selectIncompletedTodosForProject = (
  state: RootState,
  projectId: string
) => {
  return state.todos.filter(
    (todo) => todo.projectId === projectId && todo.completed === false
  );
};

export default todosSlice.reducer;
