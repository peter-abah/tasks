import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Layout, Project, Category } from './routes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/:category" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default App;
