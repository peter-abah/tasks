import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Task from "../components/Task";
import ProjectHeader from "../components/ProjectHeader";
import {
  selectProject,
} from "../features/projects/projectsSlice";
import {
  selectCompletedTasksForProject as selectCompletedTasks,
  selectIncompletedTasksForProject as selectIncompletedTasks,
} from "../features/tasks/tasksSlice";

const Project = () => {
  let { projectId } = useParams() as { projectId: string };
  const project = useAppSelector((state) => selectProject(state, projectId));

  const completedTasks = useAppSelector((state) =>
    selectCompletedTasks(state, projectId)
  );
  const incompletedTasks = useAppSelector((state) =>
    selectIncompletedTasks(state, projectId)
  );

  return (
    <div className="py-10 w-4/5 max-w-4xl mx-auto">
      <ProjectHeader {...project} />
      <div>
        <h3 className="invisible fixed top-[-9999px] left-[-9999px]">
          Upcoming
        </h3>
        <div>
          {incompletedTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="invisible fixed top-[-9999px] left-[-9999px]">
          Completed
        </h3>
        <div>
          {completedTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
