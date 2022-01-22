import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, Project, Category, Signup, Signin } from "./routes";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectUser } from "./features/users/usersSlice";
import { setAllTasks } from "./features/tasks/tasksSlice";
import { setAllProjects } from "./features/projects/projectsSlice";

import { getAllData } from "./services/tasks";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const setAllData = ([tasks, projects]: any[][]) => {
    dispatch(setAllTasks(tasks));
    dispatch(setAllProjects(projects));
  };

  // redirects to sign in page if user is not signed in
  useEffect(() => {
    !user.uid && navigate("/signin");
  }, [user.uid]);

  // loads all data from firestore
  useEffect(() => {
    if (!user.uid) return;

    getAllData(user.uid)
      .then(setAllData)
      .catch((e) => console.log(e));
  }, [user.uid]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/:category" element={<Category />} />
        <Route index element={<Category />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
