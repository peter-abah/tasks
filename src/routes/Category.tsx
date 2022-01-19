import { useParams } from "react-router-dom";
import { selectTodosCategory } from "../features/todos/todosSlice";
import { useAppSelector } from "../app/hooks";

import humanizeString from "humanize-string";

import Todo from "../components/Todo";
import NoTodos from '../components/NoTodos';

const Category = () => {
  let { category } = useParams() as any;
  category = category || "all";
  const todos = useAppSelector((state) => selectTodosCategory(state, category));

  const incompletedTodos = todos.filter((todo) => todo.completed !== true);
  const completedTodos = todos.filter((todo) => todo.completed === true);

  return (
    <div className="py-10 w-4/5 max-w-4xl mx-auto">
      <header className="relative flex justify-between mx-2 pt-2 pb-8">
        <h2 className="text-xl font-bold">{humanizeString(category)}</h2>
      </header>

      {todos.length === 0 ? (
        <NoTodos />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Category;
