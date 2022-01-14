import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Layout, Project } from './routes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/projects/:projectId" element={<Project />} />
      </Route>
    </Routes>
  );
}

export default App;
