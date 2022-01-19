import { Link } from "react-router-dom";
import { Project } from "../features/projects/projectsSlice";

interface Props {
  project: Project;
  handleClick: () => void;
}

const ProjectLink = ({ project, handleClick }: Props) => {
  return (
    <li className="p-2 mb-2 rounded-lg hover:bg-neutral-800">
      <Link onClick={handleClick} to={`projects/${project.id}`}>
        <span>{project.title}</span>
      </Link>
    </li>
  );
};

export default ProjectLink;
