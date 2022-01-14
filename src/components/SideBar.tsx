import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectProjects, update } from "../features/projects/projectsSlice";
import uniqid from "uniqid";
import ProjectLink from './ProjectLink';
import ProjectForm from "./ProjectForm";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const newProject = {
  title: "",
  id: uniqid(),
};

const SideBar = () => {
  const [isFormHidden, setFormHidden] = useState(true);
  const [project, setProject] = useState(newProject);
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  const showForm = () => setFormHidden(false);

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target;
    setProject({ ...project, title: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project.title === "") return;

    dispatch(update(project));
    setProject({
      title: "",
      id: uniqid(),
    });
  };
  return (
    <aside>
      <header className="flex justify-between">
        <h2>Projects</h2>
        <button onClick={showForm}>+</button>
      </header>
      <div>
        {projects.map((project) => (
          <ProjectLink key={project.id} project={project} />
        ))}
      </div>

      {!isFormHidden && (
        <ProjectForm
          project={project}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </aside>
  );
};

export default SideBar;
