import React, { useState, useRef } from "react";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import { Outlet } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectIsLoading,
  selectAppLoading,
  selectSideBarVisibility,
  updateSideBarVisibility,
} from "../features/ui/uiSlice";
import useTaskForm from "../hooks/useTaskForm";

import { AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TaskFormModal from "../components/TaskFormModal";
import LoadingBar from "../components/LoadingBar";
import MainLoadingAnim from "../components/MainLoadingAnim";

const Layout = () => {
  const isSideBarVisible = useAppSelector(selectSideBarVisibility);
  const isLoading = useAppSelector(selectIsLoading);
  const appLoading = useAppSelector(selectAppLoading);

  const [errorMsg, setErrorMsg] = useState("");
  const { value: isFormVisible, toggle: toggleForm } = useBoolean(false);
  const dispatch = useAppDispatch();
  const {
    task,
    handleChange: handleTaskChange,
    handleSubmit: handleTaskSubmit,
    isValid: isTaskValid,
    clearForm: clearTaskForm,
  } = useTaskForm();

  const toggleSideBar = () =>
    dispatch(updateSideBarVisibility(!isSideBarVisible));

  const sideBarRef = useRef<HTMLElement>(null);
  const handleClickOutside = () => toggleSideBar();
  useOnClickOutside(sideBarRef, handleClickOutside);

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

  if (appLoading) return <MainLoadingAnim />;

  return (
    <main className="h-full flex flex-col items-stretch">
      {isLoading && <LoadingBar />}
      <NavBar openModal={toggleForm} />
      <div className="flex flex-col items-stretch relative h-full">
        <AnimatePresence>
          {isSideBarVisible && <SideBar ref={sideBarRef} />}
        </AnimatePresence>
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
