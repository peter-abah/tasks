import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectProjects, update } from "../features/projects/projectsSlice";
import uniqid from "uniqid";
import AddIcon from '@mui/icons-material/Add';
import ProjectLink from "./ProjectLink";
import ProjectForm from "./ProjectForm";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const newProject = {
  title: "",
  id: uniqid(),
};

const SideBar = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [project, setProject] = useState(newProject);
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  const showForm = () => setFormVisible(true);

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target;
    setProject({ ...project, title: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project.title === "") return;

    dispatch(update(project));;
    setFormVisible(false);
    setProject({
      title: "",
      id: uniqid(),
    });
  };
  return (
    <aside className="!bg-nav absolute top-0 left-0 w-80 h-full pl-7 pr-4 py-3 z-10 text-sm">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-bold">Projects</h2>
        <button onClick={showForm}>
          <AddIcon className="!text-lg" />
        </button>
      </header>
      <ul>
        {projects.map((project) => (
          <ProjectLink key={project.id} project={project} />
        ))}
      </ul>

      {isFormVisible && (
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
