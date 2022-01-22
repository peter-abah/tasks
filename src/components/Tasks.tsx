import { Task as Itask } from "../features/tasks/tasksSlice";
import Task from "./Task";

interface Iprops {
  incompletedTasks: Itask[];
  completedTasks: Itask[];
}

const Tasks = ({ incompletedTasks, completedTasks }: Iprops) => {
  return (
    <>
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
    </>
  );
};

export default Tasks;
