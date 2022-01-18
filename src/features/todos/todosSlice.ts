import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isPast, isToday } from "date-fns";
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
    field: string;
    order: "asc" | "desc";
  };
}

const initialState: TodosState = {
  list: [
    {
      projectId: '1',
      title: 'A big always big',
      dueDate: new Date().toString(),
      description: '',
      completed: false,
      priority: 'low',
      id: '1'
    },
    {
      projectId: '1',
      title: 'A bigger always big',
      dueDate: '',
      description: '',
      completed: false,
      priority: 'low',
      id: '2'
    },
    {
      projectId: '1',
      title: 'THis is wonderful',
      dueDate: new Date().toString(),
      description: '',
      completed: false,
      priority: 'low',
      id: '3'
    },
    {
      projectId: '2',
      title: 'A 2 big e always big',
      dueDate: '',
      description: '',
      completed: false,
      priority: 'low',
      id: '4'
    },
    {
      projectId: '2',
      title: 'A 2 big always big',
      dueDate: '',
      description: new Date().toString(),
      completed: false,
      priority: 'low',
      id: '5'
    },
    {
      projectId: '2',
      title: 'A 10 big always big',
      dueDate: '',
      description: '',
      completed: false,
      priority: 'low',
      id: '6'
    },
    {
      projectId: 'default',
      title: 'A big why me always big',
      dueDate: '',
      description: '',
      completed: false,
      priority: 'low',
      id: '7'
    },
    {
      projectId: 'default',
      title: 'A big bess always big',
      dueDate: new Date().toString(),
      description: '',
      completed: false,
      priority: 'low',
      id: '8'
    },
    {
      projectId: 'default',
      title: 'A big bess boss always big',
      dueDate: '',
      description: '',
      completed: false,
      priority: 'low',
      id: '9'
    },
    
  ],
  sort: {
    field: "",
    order: "asc",
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

export const selectAllTodos = (state: RootState) => state.todos.list;

export const selectTodayTodos = (state: RootState) => {
  return state.todos.list.filter(
    ({ dueDate }) => dueDate && isToday(new Date(dueDate))
  );
};

export const selectOverdueTodos = (state: RootState) => {
  return state.todos.list.filter(({ dueDate }) => {
    const date = dueDate && new Date(dueDate);
    return date && isPast(date) && !isToday(date);
  });
};

export const selectTodosCategory = (state: RootState, category: string) => {
  switch (category) {
    case "today":
      return selectTodayTodos(state);
    case "overdue":
      return selectOverdueTodos(state);
    case "all":
      return selectAllTodos(state);
    default:
      return selectAllTodos(state);
  }
};

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
