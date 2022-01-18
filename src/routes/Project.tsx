import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Todo from "../components/Todo";
import ProjectHeader from "../components/ProjectHeader";
import {
  selectProject,
} from "../features/projects/projectsSlice";
import {
  selectCompletedTodosForProject as selectCompletedTodos,
  selectIncompletedTodosForProject as selectIncompletedTodos,
} from "../features/todos/todosSlice";

const Project = () => {
  let { projectId } = useParams() as { projectId: string };
  const project = useAppSelector((state) => selectProject(state, projectId));

  const completedTodos = useAppSelector((state) =>
    selectCompletedTodos(state, projectId)
  );
  const incompletedTodos = useAppSelector((state) =>
    selectIncompletedTodos(state, projectId)
  );

  return (
    <div className="py-10 w-4/5 max-w-4xl mx-auto">
      <ProjectHeader {...project} />
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
