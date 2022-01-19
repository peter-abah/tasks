import { useEffect, useRef, useState } from "react";
import { useOnClickOutside, useBoolean } from "usehooks-ts";
import { useAppDispatch } from "../app/hooks";
import useTaskForm from "../hooks/useTaskForm";

import { format } from "date-fns";
import classnames from "classnames";

import { updateTaskCompletedStatus as toggleCompleteStatus } from "../features/tasks/tasksSlice";
import {
  Task as TaskType,
  remove as removeTask,
} from "../features/tasks/tasksSlice";

import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/CircleOutlined";
import CheckedCircleIcon from "@mui/icons-material/CheckCircleOutline";
import MoreIcon from "@mui/icons-material/MoreHoriz";

import { motion, AnimatePresence } from "framer-motion";
import OptionsBox from "./OptionsBox";
import TaskFormModal from "./TaskFormModal";

const MOptionsBox = motion(OptionsBox);

const Task = (props: TaskType) => {
  const { id, title, dueDate, description, completed, priority } = props;

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

  const [errorMsg, setErrorMsg] = useState("");
  const {
    task,
    handleChange,
    handleSubmit: handleTaskSubmit,
    isValid,
  } = useTaskForm(props);

  const dispatch = useAppDispatch();

  const toggleComplete = () => {
    dispatch(toggleCompleteStatus({ id, completed: !completed }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      toggleForm();
      handleTaskSubmit(e);
      setErrorMsg("");
    } else {
      setErrorMsg("Enter a title");
    }
  };

  const closeModal = () => {
    if (window.confirm("Are you sure. All changes will be lost")) {
      toggleForm();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to remove task")) {
      dispatch(removeTask(id));
    }
  };

  const date = dueDate && format(new Date(dueDate), "MMM dd");
  const completedClassName = classnames(
    "relative border-b border-neutral-700",
    {
      "text-gray-500 line-through": completed,
    }
  );

  type TpriorityColors = { [index: string]: string };
  const priorityColors: TpriorityColors = {
    low: "!text-blue-300",
    medium: "!text-green-500",
    high: "!text-red-500",
  };
  const checkBoxClass = `text-4xl ${priorityColors[priority]}`;

  return (
    <div className={completedClassName}>
      <div className="flex items-center px-1">
        <button
          onClick={toggleComplete}
          className="mr-3 p-1 rounded-full hover:bg-nav"
        >
          {completed ? (
            <CheckedCircleIcon className={checkBoxClass} />
          ) : (
            <CircleIcon className={checkBoxClass} />
          )}
        </button>
        <div
          onClick={toggleShowDescription}
          className="py-2 flex flex-col flex-grow"
        >
          <h3>{title}</h3>
          {date && <span className="mt-1 text-xs">{date}</span>}
        </div>
        <button
          className="p-1 rounded-full hover:bg-nav"
          onClick={toggleOptions}
        >
          {showOptions ? <CloseIcon /> : <MoreIcon />}
        </button>
      </div>
      <AnimatePresence>
        {showDescription && description && (
          <motion.p
            animate={{ opacity: 1, scaleY: 1 }}
            initial={{ opacity: 0, scaleY: 0 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            style={{ originY: 0 }}
            className="ml-10 mb-2 px-2"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showOptions && (
          <MOptionsBox
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            ref={optionsRef}
            handleEdit={toggleForm}
            handleDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <TaskFormModal
            {...task}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            closeModal={closeModal}
            errorMessage={errorMsg}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Task;
