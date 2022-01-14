import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectProjects } from "../features/projects/projectsSlice";

interface Props {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  projectId: string;
  handleChange: (e: React.ChangeEvent<HTMLElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
}

const TodoFormModal = (props: Props) => {
  const projects = useAppSelector(selectProjects);

  const {
    title,
    description,
    dueDate,
    projectId,
    priority,
    handleChange,
    handleSubmit,
    closeModal,
  } = props;

  return (
    <div>
      <form>
        <div>
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="todo-description">Description</label>
          <textarea
            id="todo-description"
            name="description"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="todo-date">Due Date</label>
          <input
            id="todo-date"
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="todo-priority">Priority</label>
          <input
            id="todo-priority"
            type="text"
            name="priority"
            value={priority}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TodoFormModal;
