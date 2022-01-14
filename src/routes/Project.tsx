import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Todo from '../components/Todo';
import { selectProject } from "../features/projects/projectsSlice";
import { selectTodosForProject } from "../features/todos/todosSlice";

const Project = () => {
  let { projectId } = useParams() as any;
  const project = useAppSelector((state) => selectProject(state, projectId));
  const todos = useAppSelector((state) =>
    selectTodosForProject(state, projectId)
  );

  return (
    <header>
      <h2>{project.title}</h2>
      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </header>
  );
};

export default Project;