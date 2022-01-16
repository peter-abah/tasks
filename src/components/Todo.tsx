import { format } from "date-fns";
import { Todo as TodoType } from "../features/todos/todosSlice";
import CircleIcon from "@mui/icons-material/CircleOutlined";

const Todo = (props: TodoType) => {
  const { id, title, dueDate } = props;

  const date = dueDate && format(new Date(dueDate), "MMM dd");
  return (
    <div className="flex items-center border-b px-1 border-neutral-700">
      <button className="mr-3">
        <CircleIcon className="!text-xl" />
      </button>
      <div className="py-2 flex flex-col">
        <h3>{title}</h3>
        {date && <span className="mt-1 text-xs">{date}</span>}
      </div>
    </div>
  );
};

export default Todo;
