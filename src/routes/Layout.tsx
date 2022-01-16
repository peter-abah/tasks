import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import useTodoForm from "../hooks/useTodoForm";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TodoFormModal from "../components/TodoFormModal";

const Layout = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    todo,
    handleChange: handleTodoChange,
    handleSubmit: handleTodoSubmit,
    isValid: isTodoValid,
  } = useTodoForm();

  const toggleForm = () => setIsFormVisible(!isFormVisible);

  const handleSubmit = (e: React.FormEvent) => {
    handleTodoSubmit(e);
    if (isTodoValid()) toggleForm();
  }

  return (
    <main>
      <NavBar openModal={toggleForm} />
      <div>
        <SideBar />
        <Outlet />
      </div>
      {isFormVisible && (
        <TodoFormModal
          {...todo}
          handleChange={handleTodoChange}
          handleSubmit={handleSubmit}
          closeModal={toggleForm}
        />
      )}
    </main>
  );
};

export default Layout;
