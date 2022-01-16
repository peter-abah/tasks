import { useState } from "react";
import { Outlet } from "react-router-dom";
import useTodoForm from "../hooks/useTodoForm";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TodoFormModal from "../components/TodoFormModal";

const Layout = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { todo, handleChange, handleSubmit } = useTodoForm();

  const toggleForm = () => setIsFormVisible(!isFormVisible);

  return (
    <main>
      <NavBar />
      <div>
        <SideBar />
        <Outlet />
      </div>
      {isFormVisible && (
        <TodoFormModal
          {...todo}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={toggleForm}
        />
      )}
    </main>
  );
};

export default Layout;
