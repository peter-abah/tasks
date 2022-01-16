// Encapsulates logic for handling todo data in a todo form
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import uniqid from "uniqid";
import { Todo, update as updateTodo } from "../features/todos/todosSlice";

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// making this a function so a new object is created every time it is called
const newTodo = (): Todo => ({
  title: "",
  description: "",
  dueDate: "",
  priority: "",
  id: uniqid(),
  projectId: "",
});

interface ErrorFields {
  [index: string]: boolean;
}

const useTodoForm = (data = newTodo()) => {
  const [todo, setTodo] = useState(data);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.currentTarget;
    setTodo({ ...todo, [name]: value });
  };

  const getErrors = () => {
    const fields = ["title", "description", "projectId"];
    const errors = fields.reduce((e: ErrorFields, field) => {
      return { ...e, [field]: todo[field] === "" };
    }, {});
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = Object.values(getErrors()).every(
      (isError) => isError === false
    );
    if (!isValid) return;

    dispatch(updateTodo(todo));
  };

  return { todo, handleChange, handleSubmit, getErrors };
};

export default useTodoForm;
