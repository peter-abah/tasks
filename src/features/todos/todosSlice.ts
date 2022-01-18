import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
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

export interface TodosState {
  list: Todo[];
  sort: {
    field: string,
    order: 'asc' | 'desc',
  };
}

const initialState: TodosState = {
  list: [],
  sort: {
    field: '',
    order: 'asc'
  },
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Adds a new todo or updates an existing code
    update(state, action: PayloadAction<Todo>) {
      const todo = action.payload;

      // filters todo from state if its exists (existing todo)
      state.list = state.list.filter(({ id }) => id !== todo.id);
      state.list.push(todo);
      return state;
    },

    remove(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.list = state.list.filter((todo) => todo.id !== id);
      return state;
    },

    updateTodoCompletedStatus(
      state,
      action: PayloadAction<IcompleteTodoActionPayload>
    ) {
      const { id, completed } = action.payload;
      const todo = state.list.filter((e) => e.id === id)[0];
      todo.completed = completed;
    },

    // removes todos from state that pass the predicate function
    removeTodosForProject(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.list = state.list.filter((todo) => todo.projectId !== id);
      return state;
    },
  },
});

export const {
  update,
  remove,
  updateTodoCompletedStatus,
  removeTodosForProject,
} = todosSlice.actions;

export const selectTodosForProject = (state: RootState, projectId: string) => {
  return state.todos.list.filter((todo) => todo.projectId === projectId);
};

export const selectCompletedTodosForProject = (
  state: RootState,
  projectId: string
) => {
  return state.todos.list.filter(
    (todo) => todo.projectId === projectId && todo.completed === true
  );
};

export const selectIncompletedTodosForProject = (
  state: RootState,
  projectId: string
) => {
  return state.todos.list.filter(
    (todo) => todo.projectId === projectId && todo.completed === false
  );
};

export default todosSlice.reducer;
