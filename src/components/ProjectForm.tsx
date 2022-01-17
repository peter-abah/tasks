import React from "react";
import { Project } from "../features/projects/projectsSlice";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props {
  project: Project;
  handleChange: (e: ChangeEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ProjectForm = (props: Props) => {
  const { project, handleChange, handleSubmit } = props;
  return (
    <form className="flex py-2">
      <input
        className="border-b border-solid border-text mr-4 pb-1 focus-visible:border-b-4 focus-visible:outline-none"
        type="text"
        value={project.title}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
};

export default ProjectForm;
