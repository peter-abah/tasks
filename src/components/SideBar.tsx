import { useAppSelector } from "../app/hooks";
import { selectProjects } from "../features/projects/projectsSlice";
import ProjectLink from "./ProjectBtn";

const SideBar = () => {
  const projects = useAppSelector(selectProjects);

  return (
    <aside>
      <h2>Projects</h2>
      <div>
        {projects.map((project) => (
          <ProjectLink key={project.id} project={project} />
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
