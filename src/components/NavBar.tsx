import { useAppDispatch } from "../app/hooks";
import { updateTodoFormHidden as toggleHidden } from "../features/ui/uiSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();

  return (
    <nav className="py-4 px-3">
      <h1>Todo</h1>
      <button onClick={() => dispatch(toggleHidden(false))}>Add Todo</button>
    </nav>
  );
};

export default NavBar;
