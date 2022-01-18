import React from "react";
import { Project } from "../features/projects/projectsSlice";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props {
  project: Project;
  handleChange: (e: ChangeEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleClose: () => void;
}

const ProjectForm = (props: Props) => {
  const { project, handleChange, handleSubmit, handleClose } = props;
  return (
    <form className="flex flex-wrap gap-2 py-2">
      <input
        className="border-b border-solid border-text mr-4 pb-1 focus-visible:border-b-4 focus-visible:outline-none"
        type="text"
        name="title"
        value={project.title}
        onChange={handleChange}
      />
      <div className="flex gap-2">
        <button
          className="mr-4 px-4 py-1 rounded-md bg-amber-700"
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          className="mr-4 px-4 py-1 rounded-md bg-red-700"
          type="submit"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
