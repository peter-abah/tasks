import { useAppDispatch } from "../app/hooks";
import { updateTodoCompletedStatus as toggleCompleteStatus } from "../features/todos/todosSlice";
import { format } from "date-fns";
import { Todo as TodoType } from "../features/todos/todosSlice";
import CircleIcon from "@mui/icons-material/CircleOutlined";
import CheckedCircleIcon from "@mui/icons-material/CheckCircleOutline";

const Todo = (props: TodoType) => {
  const { id, title, dueDate, completed } = props;
  const dispatch = useAppDispatch();

  const toggleComplete = () => {
    dispatch(toggleCompleteStatus({ id, completed: !completed }));
  };

  const date = dueDate && format(new Date(dueDate), "MMM dd");
  return (
    <div className="flex items-center border-b px-1 border-neutral-700">
      <button onClick={toggleComplete} className="mr-3">
        {completed ? (
          <CheckedCircleIcon className="!text-xl" />
        ) : (
          <CircleIcon className="!text-xl" />
        )}
      </button>
      <div className="py-2 flex flex-col">
        <h3>{title}</h3>
        {date && <span className="mt-1 text-xs">{date}</span>}
      </div>
    </div>
  );
};

export default Todo;
