import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="articles/:id" element={<ArticlePage />} />
      </Route>
    </Routes>
  );
}

export default App;
