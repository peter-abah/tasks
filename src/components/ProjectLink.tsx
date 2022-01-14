import { Link } from "react-router-dom";
import { Project } from "../features/projects/projectsSlice";

interface Props {
  project: Project
}

const ProjectLink = ({ project }: Props) => {
  return (
    <Link to={`projects/${project.id}`} >
      <p>
        <span>{project.title}</span>
      </p>
    </Link>
  );   
};

export default ProjectLink;