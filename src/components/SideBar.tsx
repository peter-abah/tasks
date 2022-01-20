import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import useProjectForm from "../hooks/useProjectForm";

import { selectProjects, Project } from "../features/projects/projectsSlice";
import { updateSideBarVisibility } from "../features/ui/uiSlice";

import { motion } from "framer-motion";
import uniqid from "uniqid";

import SideBarHeader from "./SideBarHeader";
import ProjectLink from "./ProjectLink";
import ProjectForm from "./ProjectForm";
import CategoriesBar from "./CategoriesBar";
import { useBoolean } from "usehooks-ts";

const newProject = (): Project => {
  return { title: "", id: uniqid() };
};

const SideBar = React.forwardRef<HTMLElement>((_, ref) => {
  const {
    value: isFormVisible,
    toggle: toggleForm,
  } = useBoolean(false);

  const {
    project,
    handleSubmit: handleProjectSubmit,
    handleChange,
    isValid,
    clearForm,
  } = useProjectForm('new');

  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      handleProjectSubmit(e);
      toggleForm();
      clearForm();
    }
  };

  const closeSideBar = () => dispatch(updateSideBarVisibility(false));

  return (
    <motion.aside
      key="sidebar"
      animate={{ x: 0 }}
      initial={{ x: -300 }}
      transition={{ ease: "easeIn", duration: 0.5 }}
      exit={{ x: -300 }}
      ref={ref}
      className="!bg-nav absolute top-0 left-0 w-80 max-w-[100vw] min-h-full pl-7 pr-4 py-3 z-10 text-sm"
    >
      <CategoriesBar closeSideBar={closeSideBar} />
      <SideBarHeader toggleForm={toggleForm} />
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
});

export default SideBar;
