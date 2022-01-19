import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { selectSideBarVisibility } from "../features/ui/uiSlice";
import useTodoForm from "../hooks/useTodoForm";

import { AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TodoFormModal from "../components/TodoFormModal";

const Layout = () => {
  const isSideBarVisible = useAppSelector(selectSideBarVisibility);
  const [errorMsg, setErrorMsg] = useState("");
  const { value: isFormVisible, toggle: toggleForm } = useBoolean(false);
  const {
    todo,
    handleChange: handleTodoChange,
    handleSubmit: handleTodoSubmit,
    isValid: isTodoValid,
    clearForm: clearTodoForm,
  } = useTodoForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isTodoValid()) {
      handleTodoSubmit(e);
      toggleForm();
      clearTodoForm();
      setErrorMsg("");
    } else {
      setErrorMsg("Enter a title");
    }
  };

  const closeModal = () => {
    if (window.confirm("Are you sure. All changes will be lost")) {
      toggleForm();
      clearTodoForm();
    }
  };

  return (
    <main className="h-full flex flex-col items-stretch">
      <NavBar openModal={toggleForm} />
      <div className="flex flex-col items-stretch relative h-full">
        <AnimatePresence>{isSideBarVisible && <SideBar />}</AnimatePresence>
        <Outlet />
      </div>
      {isFormVisible && (
        <TodoFormModal
          {...todo}
          handleChange={handleTodoChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          errorMessage={errorMsg}
        />
      )}
    </main>
  );
};

export default Layout;
