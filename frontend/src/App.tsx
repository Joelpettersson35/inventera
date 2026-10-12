import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import Settings from "./pages/Settings";
import Create from "./pages/Create";
import Categories from "./pages/Categories";
import NoQrLayout from "./layouts/NoQrLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="articles/:id" element={<ArticlePage />} />
      </Route>
      <Route element={<NoQrLayout />}>
        <Route path="create" element={<Create />} />
        <Route path="categories" element={<Categories />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
