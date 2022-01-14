import { Todo as TodoType } from "../features/todos/todosSlice"

const Todo = (props: TodoType) => {
  const { id, title } = props;
  return (
    <div>
      <h3>{title}</h3>
    </div>
  )
};

export default Todo;
