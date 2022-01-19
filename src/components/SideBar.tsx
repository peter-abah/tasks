import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";

import { selectProjects, update } from "../features/projects/projectsSlice";
import { updateSideBarVisibility } from "../features/ui/uiSlice";

import { motion, AnimatePresence } from "framer-motion";

import uniqid from "uniqid";
import AddIcon from "@mui/icons-material/Add";
import ProjectLink from "./ProjectLink";
import ProjectForm from "./ProjectForm";
import CategoriesBar from "./CategoriesBar";
import { useBoolean } from "usehooks-ts";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const newProject = {
  title: "",
  id: uniqid(),
};

const SideBar = () => {
  const {
    value: isFormVisible,
    setValue: setFormVisible,
    toggle: toggleForm,
  } = useBoolean(false);

  const [project, setProject] = useState(newProject);
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target;
    setProject({ ...project, title: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project.title === "") return;

    dispatch(update(project));
    setFormVisible(false);
    setProject({
      title: "",
      id: uniqid(),
    });
  };

  const closeSideBar = () => dispatch(updateSideBarVisibility(false));

  return (
    <motion.aside
      key="sidebar"
      animate={{ x: 0 }}
      initial={{ x: -300 }}
      transition={{ ease: "easeIn", duration: 0.5 }}
      exit={{ x: -300 }}
      className="!bg-nav absolute top-0 left-0 w-80 max-w-[100vw] h-full pl-7 pr-4 py-3 z-10 text-sm"
    >
      <CategoriesBar closeSideBar={closeSideBar} />
      <header className="flex justify-between items-center py-3">
        <h2 className="font-bold">Projects</h2>
        <button onClick={toggleForm}>
          <AddIcon className="!text-lg" />
        </button>
      </header>
      <ul>
        {projects.map((project) => (
          <ProjectLink
            key={project.id}
            handleClick={closeSideBar}
            project={project}
          />
        ))}
      </ul>

      {isFormVisible && (
        <ProjectForm
          project={project}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClose={toggleForm}
        />
      )}
    </motion.aside>
  );
};

export default SideBar;
