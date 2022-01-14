import React from "react";
import { Project } from "../features/projects/projectsSlice";
import uniqid from "uniqid";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props {
  project: Project;
  handleChange: (e: ChangeEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
}
const newProject = {
  title: "",
  id: uniqid(),
};

const ProjectForm = (props: Props) => {
  const { project, handleChange, handleSubmit } = props;
  return (
    <form>
      <input type="text" value={project.title} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;
