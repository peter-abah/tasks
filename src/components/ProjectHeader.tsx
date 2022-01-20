import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { useOnClickOutside, useBoolean } from "usehooks-ts";
import useProjectForm from "../hooks/useProjectForm";

import {
  Project,
  remove as removeProject,
} from "../features/projects/projectsSlice";
import { removeTasksForProject } from "../features/tasks/tasksSlice";

import MoreIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

import OptionsBox from "../components/OptionsBox";
import ProjectForm from "../components/ProjectForm";

const ProjectHeader = (props: Project) => {
  const { id, title } = props;
  const navigate = useNavigate();
  const { value: showForm, toggle: toggleForm } = useBoolean(false);

  const {
    value: showOptions,
    setValue: setShowOptions,
    toggle: toggleOptions,
  } = useBoolean(false);

  const {
    project,
    handleChange,
    handleSubmit: handleProjectSubmit,
    isValid,
  } = useProjectForm('edit', props);
  const dispatch = useAppDispatch();

  const optionsRef = useRef<HTMLDivElement>(null);
  const outSideClickHandler = () => setShowOptions(false);
  useOnClickOutside(optionsRef, outSideClickHandler);

  const handleDelete = () => {
    dispatch(removeProject(id));
    dispatch(removeTasksForProject(id));
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      handleProjectSubmit(e);
      toggleForm();
    }
  };

  const isDefault = id === "default";
  return (
    <header className="relative flex justify-between mx-2 pt-2 pb-8">
      {showForm ? (
        <ProjectForm
          project={project}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClose={toggleForm}
        />
      ) : (
        <h2 className="text-xl font-bold">{title}</h2>
      )}
      {!isDefault && (
        <button onClick={toggleOptions}>
          {showOptions ? <CloseIcon /> : <MoreIcon />}
        </button>
      )}
      {showOptions && (
        <OptionsBox
          ref={optionsRef}
          handleEdit={toggleForm}
          handleDelete={handleDelete}
        />
      )}
    </header>
  );
};

export default ProjectHeader;
