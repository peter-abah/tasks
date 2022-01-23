import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  update as updateProject,
  Project,
} from "../features/projects/projectsSlice";
import { updateLoading } from "../features/ui/uiSlice";
import { selectUser } from "../features/users/usersSlice";
import { updateProject as updateProjectInFirestore } from "../services/projects";

const newProject = (): Project => {
  return { title: "", id: uniqid() };
};

const useProjectForm = (mode: string, data = newProject()) => {
  // this is a hack will fix later
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [project, setProject] = useState(data);

  // changes project data to new data if project changes
  useEffect(() => {
    if (project.id !== data.id && mode !== "new") setProject(data);
  }, [project, data, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const isValid = () => project.title !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      dispatch(updateLoading(true));
      updateProjectInFirestore(user.uid, project)
        .then(() => dispatch(updateProject(project)))
        .catch((e) => {
          debugger;
        })
        .finally(() => dispatch(updateLoading(false)));
    }
  };

  const clearForm = () => setProject(newProject());

  return { project, handleChange, handleSubmit, isValid, clearForm };
};

export default useProjectForm;
