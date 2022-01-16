import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { updateTodoCompletedStatus as toggleCompleteStatus } from "../features/todos/todosSlice";
import { format } from "date-fns";
import classnames from "classnames";
import { Todo as TodoType } from "../features/todos/todosSlice";
import CircleIcon from "@mui/icons-material/CircleOutlined";
import CheckedCircleIcon from "@mui/icons-material/CheckCircleOutline";

const Todo = (props: TodoType) => {
  const [showDescription, setShowDescription] = useState(false);
  const { id, title, dueDate, description, completed } = props;
  const dispatch = useAppDispatch();

  const toggleComplete = () => {
    dispatch(toggleCompleteStatus({ id, completed: !completed }));
  };

  const completedClassName = classnames(
    "border-b border-neutral-700",
    { "text-gray-500 line-through": completed }
  );

  const date = dueDate && format(new Date(dueDate), "MMM dd");
  return (
    <div className={completedClassName}>
      <div onClick={() => setShowDescription(!showDescription)} className="flex items-center px-1">
        <button onClick={toggleComplete} className="mr-3">
          {completed ? (
            <CheckedCircleIcon className="!text-xl" />
          ) : (
            <CircleIcon className="!text-xl" />
          )}
        </button>
        <div className="py-2 flex flex-col flex-grow">
          <h3>{title}</h3>
          {date && <span className="mt-1 text-xs">{date}</span>}
        </div>
      </div>
      {(showDescription && description) && <p className="ml-10 mb-2">{description}</p>}
    </div>
  );
};

export default Todo;
