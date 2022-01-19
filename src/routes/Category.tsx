import { useParams } from "react-router-dom";
import { selectTasksCategory } from "../features/tasks/tasksSlice";
import { useAppSelector } from "../app/hooks";

import humanizeString from "humanize-string";

import Task from "../components/Task";
import NoTasks from '../components/NoTasks';

const Category = () => {
  let { category } = useParams() as any;
  category = category || "all";
  const tasks = useAppSelector((state) => selectTasksCategory(state, category));

  const incompletedTasks = tasks.filter((task) => task.completed !== true);
  const completedTasks = tasks.filter((task) => task.completed === true);

  return (
    <div className="py-10 w-4/5 max-w-4xl mx-auto">
      <header className="relative flex justify-between mx-2 pt-2 pb-8">
        <h2 className="text-xl font-bold">{humanizeString(category)}</h2>
      </header>

      {tasks.length === 0 ? (
        <NoTasks />
      ) : (
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
      )}
    </div>
  );
};

export default Category;
