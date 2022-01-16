import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectSideBarVisibility } from "../features/ui/uiSlice";
import useTodoForm from "../hooks/useTodoForm";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TodoFormModal from "../components/TodoFormModal";

const Layout = () => {
  const isSideBarVisible = useAppSelector(selectSideBarVisibility);
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
    <main className="h-full flex flex-col items-stretch">
      <NavBar openModal={toggleForm} />
      <div className="flex flex-col items-stretch relative h-full">
        {isSideBarVisible && <SideBar />}
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
