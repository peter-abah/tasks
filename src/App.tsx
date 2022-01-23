import { useCallback, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Layout, Project, Category, Signup, Signin } from "./routes";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectUser } from "./features/users/usersSlice";
import { setAllTasks } from "./features/tasks/tasksSlice";
import { setAllProjects } from "./features/projects/projectsSlice";

import { getAllData } from "./services/tasks";
import { updateAppLoading } from "./features/ui/uiSlice";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const setAllData = useCallback(
    ([tasks, projects]: any[][]) => {
      dispatch(setAllTasks(tasks));
      dispatch(setAllProjects(projects));
    },
    [dispatch]
  );

  // redirects to sign in page if user is not signed in
  useEffect(() => {
    const pathRegex = /signup$/; // tests if path is signup path
    if (user.uid || pathRegex.test(location.pathname)) return;

    navigate("/signin");
  }, [user.uid, navigate, location.pathname]);

  // loads all data from firestore
  useEffect(() => {
    if (!user.uid) return;

    dispatch(updateAppLoading(true));

    getAllData(user.uid)
      .then(setAllData)
      .catch((e) => console.log(e))
      .finally(() => dispatch(updateAppLoading(false)));
  }, [user.uid, dispatch, setAllData]);

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
