import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

import { selectProject } from "../features/projects/projectsSlice";
import {
  selectCompletedTasksForProject as selectCompletedTasks,
  selectIncompletedTasksForProject as selectIncompletedTasks,
} from "../features/tasks/tasksSlice";

import Tasks from "../components/Tasks";
import NoTasks from "../components/NoTasks";
import ProjectHeader from "../components/ProjectHeader";

const Project = () => {
  let { projectId } = useParams() as { projectId: string };
  const project = useAppSelector((state) => selectProject(state, projectId));

  const completedTasks = useAppSelector((state) =>
    selectCompletedTasks(state, projectId)
  );
  const incompletedTasks = useAppSelector((state) =>
    selectIncompletedTasks(state, projectId)
  );
  const tasksLength = completedTasks.length + incompletedTasks.length;

  return (
    <div className="py-10 w-4/5 max-w-4xl mx-auto">
      <ProjectHeader project={project} />
      {tasksLength === 0 ? (
        <NoTasks />
      ) : (
        <Tasks
          completedTasks={completedTasks}
          incompletedTasks={incompletedTasks}
        />
      )}
    </div>
  );
};

export default Project;
