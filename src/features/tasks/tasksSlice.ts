import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isPast, isToday } from "date-fns";
import { RootState } from "../../app/store";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  completed: boolean;
  [index: string]: string | boolean;
}

interface IcompleteTaskActionPayload {
  id: string;
  completed: boolean;
}

export interface TasksState {
  list: Task[];
  sort: {
    field: string;
    order: "asc" | "desc";
  };
}

const initialState: TasksState = {
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

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Adds a new task or updates an existing code
    update(state, action: PayloadAction<Task>) {
      const task = action.payload;

      // filters task from state if its exists (existing task)
      state.list = state.list.filter(({ id }) => id !== task.id);
      state.list.push(task);
      return state;
    },

    remove(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.list = state.list.filter((task) => task.id !== id);
      return state;
    },

    updateTaskCompletedStatus(
      state,
      action: PayloadAction<IcompleteTaskActionPayload>
    ) {
      const { id, completed } = action.payload;
      const task = state.list.filter((e) => e.id === id)[0];
      task.completed = completed;
    },

    // removes tasks from state that pass the predicate function
    removeTasksForProject(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.list = state.list.filter((task) => task.projectId !== id);
      return state;
    },

    setAllTasks(state, action: PayloadAction<any[]>) {
      state.list = action.payload;
      return state;
    }
  },
});

export const {
  update,
  remove,
  updateTaskCompletedStatus,
  removeTasksForProject,
  setAllTasks,
} = tasksSlice.actions;

export const selectAllTasks = (state: RootState) => state.tasks.list;

export const selectTodayTasks = (state: RootState) => {
  return state.tasks.list.filter(
    ({ dueDate }) => dueDate && isToday(new Date(dueDate))
  );
};

export const selectOverdueTasks = (state: RootState) => {
  return state.tasks.list.filter(({ dueDate }) => {
    const date = dueDate && new Date(dueDate);
    return date && isPast(date) && !isToday(date);
  });
};

export const selectTasksCategory = (state: RootState, category: string) => {
  switch (category) {
    case "today":
      return selectTodayTasks(state);
    case "overdue":
      return selectOverdueTasks(state);
    case "all":
      return selectAllTasks(state);
    default:
      return selectAllTasks(state);
  }
};

export const selectTasksForProject = (state: RootState, projectId: string) => {
  return state.tasks.list.filter((task) => task.projectId === projectId);
};

export const selectCompletedTasksForProject = (
  state: RootState,
  projectId: string
) => {
  return state.tasks.list.filter(
    (task) => task.projectId === projectId && task.completed === true
  );
};

export const selectIncompletedTasksForProject = (
  state: RootState,
  projectId: string
) => {
  return state.tasks.list.filter(
    (task) => task.projectId === projectId && task.completed === false
  );
};

export default tasksSlice.reducer;
