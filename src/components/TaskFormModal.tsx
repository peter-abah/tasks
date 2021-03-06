import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectProjects } from "../features/projects/projectsSlice";
import { motion } from "framer-motion";

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
  errorMessage: string;
}

const TaskFormModal = (props: Props) => {
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
    errorMessage,
  } = props;

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: '100vh', opacity: 0 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{ ease: "easeIn", duration: 0.5 }}
      key="task-form"
      className="bg-transparent fixed top-0 left-0 h-screen w-screen z-30 flex items-center justify-center"
    >
      <form className="w-4/5 max-w-lg bg-primary shadow-lg rounded-2xl overflow-hidden text-sm">
        <div className="p-4 flex flex-col border-b border-neutral-700">
          <input
            className="mb-2 focus-visible:outline-none"
            id="task-title"
            type="text"
            name="title"
            placeholder="e.g Clean the kitchen"
            value={title}
            onChange={handleChange}
          />

          <textarea
            className="h-20 focus-visible:outline-none"
            id="task-description"
            name="description"
            value={description}
            placeholder="Description"
            onChange={handleChange}
          ></textarea>
        </div>

        {errorMessage && <p className="p-4 pb-0 text-xs">{errorMessage}</p>}

        <div className="p-4">
          <div className="pb-4 flex flex-wrap gap-4 justify-between items-center">
            <div>
              <label className="pr-2" htmlFor="task-date">
                Due Date:
              </label>
              <input
                className="p-1 border rounded-md"
                id="task-date"
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="pr-2" htmlFor="task-priority">
                Priority:
              </label>
              <select
                className="appearance-none text-center focus-visible:outline-none p-1 border rounded-md"
                name="priority"
                id="task-priority"
                onChange={handleChange}
                value={priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="pr-2" htmlFor="task-project">
                Project
              </label>

              <select
                className="max-w-[15ch] overflow-x-hidden appearance-none text-center focus-visible:outline-none p-1 border rounded-md"
                name="projectId"
                id="task-project"
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
              Save
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
    </motion.div>
  );
};

export default TaskFormModal;
