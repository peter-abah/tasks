import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, Project, Category, Signup, Signin } from "./routes";

import { useAppSelector} from './app/hooks';
import { selectUser } from './features/users/usersSlice';

function App() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    !user && navigate('/signin');
  });
  
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
