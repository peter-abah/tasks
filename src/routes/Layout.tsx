import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { selectSideBarVisibility } from "../features/ui/uiSlice";
import useTaskForm from "../hooks/useTaskForm";

import { AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TaskFormModal from "../components/TaskFormModal";

const Layout = () => {
  const isSideBarVisible = useAppSelector(selectSideBarVisibility);
  const [errorMsg, setErrorMsg] = useState("");
  const { value: isFormVisible, toggle: toggleForm } = useBoolean(false);
  const {
    task,
    handleChange: handleTaskChange,
    handleSubmit: handleTaskSubmit,
    isValid: isTaskValid,
    clearForm: clearTaskForm,
  } = useTaskForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isTaskValid()) {
      handleTaskSubmit(e);
      toggleForm();
      clearTaskForm();
      setErrorMsg("");
    } else {
      setErrorMsg("Enter a title");
    }
  };

  const closeModal = () => {
    if (window.confirm("Are you sure. All changes will be lost")) {
      toggleForm();
      clearTaskForm();
    }
  };

  return (
    <main className="h-full flex flex-col items-stretch">
      <NavBar openModal={toggleForm} />
      <div className="flex flex-col items-stretch relative h-full">
        <AnimatePresence>{isSideBarVisible && <SideBar />}</AnimatePresence>
        <Outlet />
      </div>
      <AnimatePresence>
        {isFormVisible && (
          <TaskFormModal
            {...task}
            handleChange={handleTaskChange}
            handleSubmit={handleSubmit}
            closeModal={closeModal}
            errorMessage={errorMsg}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Layout;
