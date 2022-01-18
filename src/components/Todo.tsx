import { useRef } from "react";
import { useOnClickOutside, useBoolean } from "usehooks-ts";
import { useAppDispatch } from "../app/hooks";
import useTodoForm from "../hooks/useTodoForm";

import { format } from "date-fns";
import classnames from "classnames";

import {
  updateTodoCompletedStatus as toggleCompleteStatus,
  remove as removeTodo,
} from "../features/todos/todosSlice";
import { Todo as TodoType } from "../features/todos/todosSlice";

import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/CircleOutlined";
import CheckedCircleIcon from "@mui/icons-material/CheckCircleOutline";
import MoreIcon from "@mui/icons-material/MoreHoriz";

import OptionsBox from "./OptionsBox";
import TodoFormModal from "./TodoFormModal";

const Todo = (props: TodoType) => {
  const { id, title, dueDate, description, completed } = props;

  const { value: showDescription, toggle: toggleShowDescription } =
    useBoolean(false);

  const {
    value: showOptions,
    setValue: setShowOptions,
    toggle: toggleOptions,
  } = useBoolean(false);

  const { value: showForm, toggle: toggleForm } = useBoolean(false);

  const optionsRef = useRef<HTMLDivElement>(null);
  const outsideClickHandler = () => setShowOptions(false);
  useOnClickOutside(optionsRef, outsideClickHandler);

  const {
    todo,
    handleChange,
    handleSubmit: handleTodoSubmit,
    isValid,
  } = useTodoForm(props);
  const dispatch = useAppDispatch();

  const toggleComplete = () => {
    dispatch(toggleCompleteStatus({ id, completed: !completed }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    handleTodoSubmit(e);
    if (isValid()) toggleForm();
  };

  const closeModal = () => {
    if (window.confirm("Are you sure. All changes will be lost")) {
      toggleForm();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to remove task")) {
      dispatch(removeTodo(id));
    }
  };

  const date = dueDate && format(new Date(dueDate), "MMM dd");
  const completedClassName = classnames(
    "relative border-b border-neutral-700",
    {
      "text-gray-500 line-through": completed,
    }
  );

  return (
    <div className={completedClassName}>
      <div className="flex items-center px-1">
        <button onClick={toggleComplete} className="mr-3">
          {completed ? (
            <CheckedCircleIcon className="!text-xl" />
          ) : (
            <CircleIcon className="!text-xl" />
          )}
        </button>
        <div onClick={toggleShowDescription} className="py-2 flex flex-col flex-grow">
          <h3>{title}</h3>
          {date && <span className="mt-1 text-xs">{date}</span>}
        </div>
        <button onClick={toggleOptions}>
          {showOptions ? <CloseIcon /> : <MoreIcon />}
        </button>
      </div>
      {showDescription && description && (
        <p className="ml-10 mb-2">{description}</p>
      )}
      {showOptions && (
        <OptionsBox
          ref={optionsRef}
          handleEdit={toggleForm}
          handleDelete={handleDelete}
        />
      )}
      {showForm && (
        <TodoFormModal
          {...todo}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Todo;
