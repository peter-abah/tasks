import { Link } from "react-router-dom";
import { Project } from "../features/projects/projectsSlice";

interface Props {
  project: Project;
}

const ProjectLink = ({ project }: Props) => {
  return (
    <li className="py-2">
      <Link to={`projects/${project.id}`}>
        <span>{project.title}</span>
      </Link>
    </li>
  );
};

export default ProjectLink;
