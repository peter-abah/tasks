import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useOnClickOutside, useBoolean } from "usehooks-ts";
import { deleteProject as deleteProjectFromFirestore } from "../services/projects";
import useProjectForm from "../hooks/useProjectForm";

import {
  Project,
  remove as removeProject,
} from "../features/projects/projectsSlice";
import { removeTasksForProject } from "../features/tasks/tasksSlice";
import { selectUser } from "../features/users/usersSlice";

import MoreIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

import OptionsBox from "../components/OptionsBox";
import ProjectForm from "../components/ProjectForm";
import { updateLoading } from "../features/ui/uiSlice";

const ProjectHeader = (props: { project: Project }) => {
  const { id, title } = props.project;
  const user = useAppSelector(selectUser);
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
  } = useProjectForm("edit", props.project);
  const dispatch = useAppDispatch();

  const optionsRef = useRef<HTMLDivElement>(null);
  const outSideClickHandler = () => setShowOptions(false);
  useOnClickOutside(optionsRef, outSideClickHandler);

  const handleDelete = () => {
    dispatch(updateLoading(true));

    deleteProjectFromFirestore(user.uid, props.project)
      .then(() => {
        dispatch(removeProject(id));
        dispatch(removeTasksForProject(id));
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(updateLoading(false)));
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
