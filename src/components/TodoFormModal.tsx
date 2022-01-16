import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectProjects } from "../features/projects/projectsSlice";

interface Props {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  projectId: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
}

const TodoFormModal = (props: Props) => {
  const projects = useAppSelector(selectProjects);

  const projectOptions = projects.map(({ id, title }) => (
    <option key={id} value={id}>
      {title}
    </option>
  ));

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
    <div className="bg-transparent fixed top-0 left-0 h-screen w-screen z-30 flex items-center justify-center">
      <form className="w-4/5 max-w-lg bg-primary shadow-lg rounded-2xl overflow-hidden text-sm">
        <div className="p-4 flex flex-col border-b border-neutral-700">
          <input
            className="mb-2 focus-visible:outline-none"
            id="todo-title"
            type="text"
            name="title"
            placeholder="e.g Clean the kitchen"
            value={title}
            onChange={handleChange}
          />

          <textarea
            className="h-20 focus-visible:outline-none"
            id="todo-description"
            name="description"
            value={description}
            placeholder="Description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="p-4">
          <div className="pb-4 flex flex-wrap gap-4 justify-between items-center">
            <div>
              <label className="pr-2" htmlFor="todo-date">
                Due Date:
              </label>
              <input
                className="p-1 border rounded-md"
                id="todo-date"
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="pr-2" htmlFor="todo-priority">
                Priority:
              </label>
              <select
                className="appearance-none text-center focus-visible:outline-none p-1 border rounded-md"
                name="priority"
                id="todo-priority"
                onChange={handleChange}
                value={priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="pr-2" htmlFor="todo-project">
                Project
              </label>

              <select
                className="appearance-none text-center focus-visible:outline-none p-1 border rounded-md"
                name="projectId"
                id="todo-project"
                onChange={handleChange}
                value={projectId}
              >
                {projectOptions}
              </select>
            </div>
          </div>

          <div className="flex">
            <button
              className="mr-4 px-4 py-1 rounded-md bg-amber-700"
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </button>
            <button
              className="px-4 py-1 rounded-md bg-red-700"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoFormModal;
