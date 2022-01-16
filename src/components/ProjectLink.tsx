import { Link } from "react-router-dom";
import { Project } from "../features/projects/projectsSlice";

interface Props {
  project: Project;
  handleClick: () => void;
}

const ProjectLink = ({ project, handleClick }: Props) => {
  return (
    <li className="py-2">
      <Link onClick={handleClick} to={`projects/${project.id}`}>
        <span>{project.title}</span>
      </Link>
    </li>
  );
};

export default ProjectLink;
