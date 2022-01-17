import { useCallback, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Todo from "../components/Todo";
import OptionsBox from "../components/OptionsBox";
import {
  remove as removeProject,
  selectProject,
} from "../features/projects/projectsSlice";
import {
  selectCompletedTodosForProject as selectCompletedTodos,
  selectIncompletedTodosForProject as selectIncompletedTodos,
} from "../features/todos/todosSlice";
import useOutsideClick from "../hooks/useOutsideClick";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

const Project = () => {
  let { projectId } = useParams() as any;
  const project = useAppSelector((state) => selectProject(state, projectId));
  const completedTodos = useAppSelector((state) =>
    selectCompletedTodos(state, projectId)
  );
  const incompletedTodos = useAppSelector((state) =>
    selectIncompletedTodos(state, projectId)
  );

  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  const handleDelete = () => dispatch(removeProject(projectId));
  const toggleOptions = () => setShowOptions(!showOptions);

  const optionsRef = useRef<HTMLDivElement>(null);
  const outSideClickHandler = useCallback(() => setShowOptions(false), []);
  useOutsideClick(optionsRef.current, outSideClickHandler);

  return (
    <div className="py-10 w-4/5 max-w-4xl mx-auto">
      <header className="relative flex justify-between mx-2 pt-2 pb-8">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <button onClick={toggleOptions}>
          {showOptions ? <CloseIcon /> : <MoreIcon />}
        </button>
        {showOptions && (
          <OptionsBox ref={optionsRef} handleEdit={toggleForm} handleDelete={handleDelete} />
        )}
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
