import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { useAppDispatch } from "../app/hooks";
import {
  update as updateProject,
  Project,
} from "../features/projects/projectsSlice";

const newProject = (): Project => {
  return { title: "", id: uniqid() };
};

const useProjectForm = (data = newProject()) => {
  const dispatch = useAppDispatch();
  const [project, setProject] = useState(data);

  // changes project data to new data if project changes
  useEffect(() => {
    if(project.id !== data.id) setProject(data);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const isValid = () => project.title !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      dispatch(updateProject(project));
    }
  };

  const clearForm = () => setProject(newProject());

  return { project, handleChange, handleSubmit, isValid, clearForm };
};

export default useProjectForm;