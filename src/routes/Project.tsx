import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Todo from "../components/Todo";
import { selectProject } from "../features/projects/projectsSlice";
import {
  selectCompletedTodosForProject as selectCompletedTodos,
  selectIncompletedTodosForProject as selectIncompletedTodos,
} from "../features/todos/todosSlice";

const Project = () => {
  let { projectId } = useParams() as any;
  const project = useAppSelector((state) => selectProject(state, projectId));
  const completedTodos = useAppSelector((state) =>
    selectCompletedTodos(state, projectId)
  );
  const incompletedTodos = useAppSelector((state) =>
    selectIncompletedTodos(state, projectId)
  );

  return (
    <div className="py-10 w-4/5 max-w-4xl mx-auto">
      <header className="mx-2 my-2">
        <h2 className="text-xl font-bold">{project.title}</h2>
      </header>
      <div>
        <h3 className="invisible fixed top-[-9999px] left-[-9999px]">
          Upcoming
        </h3>
        <div>
          {incompletedTodos.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="invisible fixed top-[-9999px] left-[-9999px]">
          Completed
        </h3>
        <div>
          {completedTodos.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
