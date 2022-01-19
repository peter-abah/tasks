// Encapsulates logic for handling task data in a task form
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import uniqid from "uniqid";
import { Task, update as updateTask } from "../features/tasks/tasksSlice";

type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

// making this a function so a new object is created every time it is called
const newTask = (): Task => ({
  title: "",
  description: "",
  dueDate: "",
  priority: "low",
  id: uniqid(),
  projectId: "default",
  completed: false,
});

interface ErrorFields {
  [index: string]: boolean;
}

const useTaskForm = (data = newTask()) => {
  const [task, setTask] = useState(data);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.currentTarget;
    setTask({ ...task, [name]: value });
  };

  const getErrors = () => {
    const fields = ["title", "projectId"];
    const errors = fields.reduce((e: ErrorFields, field) => {
      return { ...e, [field]: task[field] === "" };
    }, {});
    return errors;
  };

  const isValid = () => {
    return Object.values(getErrors()).every((isError) => isError === false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    dispatch(updateTask(task));
  };

  const clearForm = () => {
    setTask(newTask());
  };

  return { task, handleChange, handleSubmit, getErrors, isValid, clearForm };
};

export default useTaskForm;
