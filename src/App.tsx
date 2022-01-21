import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Layout, Project, Category, Signup } from './routes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/:category" element={<Category />} />
        <Route index element={<Category />} />
      </Route>
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
