import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Todo from "../components/Todo";
import { selectProject } from "../features/projects/projectsSlice";
import { selectTodosForProject } from "../features/todos/todosSlice";

const Project = () => {
  let { projectId } = useParams() as any;
  const project = useAppSelector((state) => selectProject(state, projectId));
  const todos = useAppSelector((state) =>
    selectTodosForProject(state, projectId)
  );

  return (
    <div className="py-10 w-4/5 max-w-4xl mx-auto">
      <header className="mx-2 my-2">
        <h2 className="text-xl font-bold">{project.title}</h2>
      </header>
      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default Project;
