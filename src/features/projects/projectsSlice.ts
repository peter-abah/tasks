import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Project {
  title: string;
  id: string;
}

export type ProjectsState = Project[];

const initialState: ProjectsState = [
  {
    title: "Default",
    id: "default",
  },
  {
    title: "Lovely",
    id: "1",
  },
  {
    title: "School",
    id: "2",
  },
];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Adds a new project or updates an existing project
    update(state, action: PayloadAction<Project>) {
      const project = action.payload;

      // filters project from state if its exists (existing project)
      const filtered = state.filter(({ id }) => id !== project.id);
      return [...filtered, project];
    },

    remove(state, action: PayloadAction<string>) {
      const id = action.payload;
      return state.filter((project) => project.id !== id);
    },

    setAllProjects(state, action: PayloadAction<any[]>) {
      return action.payload;
    },
  },
});

export const { update, remove, setAllProjects } = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects;

export const selectProject = (state: RootState, projectId: string) => {
  const project = state.projects.filter(({ id }) => id === projectId)[0];
  return project;
};

export default projectsSlice.reducer;
