import { useParams } from "react-router-dom";
import { selectTasksCategory } from "../features/tasks/tasksSlice";
import { useAppSelector } from "../app/hooks";

import humanizeString from "humanize-string";

import Tasks from '../components/Tasks';
import NoTasks from "../components/NoTasks";

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
        <Tasks
          incompletedTasks={incompletedTasks}
          completedTasks={completedTasks}
        />
      )}
    </div>
  );
};

export default Category;
