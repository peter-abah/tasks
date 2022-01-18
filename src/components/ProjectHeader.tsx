import { useState, useRef, useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import useOutsideClick from "../hooks/useOutsideClick";

import {
  Project,
  remove as removeProject,
} from "../features/projects/projectsSlice";
import {
  removeIfPredicate as removeTodosIfPredicate,
  Todo,
} from "../features/todos/todosSlice";

import MoreIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

import OptionsBox from "../components/OptionsBox";

// bug: optionsBox buttons dont work in another project page if a project is deleted
const ProjectHeader = (props: Project) => {
  const { id, title } = props;

  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();

  const optionsRef = useRef<HTMLDivElement>(null);
  const outSideClickHandler = useCallback(() => setShowOptions(false), []);
  useOutsideClick(optionsRef.current, outSideClickHandler);

  const toggleForm = () => setShowForm(!showForm);
  const handleDelete = () => {
    debugger;
    dispatch(removeProject(id));
    dispatch(removeTodosIfPredicate((todo: Todo) => todo.projectId === id));
  };
  const toggleOptions = () => setShowOptions(!showOptions);

  return (
    <header className="relative flex justify-between mx-2 pt-2 pb-8">
      <h2 className="text-xl font-bold">{title}</h2>
      <button onClick={toggleOptions}>
        {showOptions ? <CloseIcon /> : <MoreIcon />}
      </button>
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
