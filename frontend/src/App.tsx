import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import Settings from "./pages/Settings";
import Create from "./pages/Create";
import CategoryPage from "./pages/CategoryPage";
import NoQrLayout from "./layouts/NoQrLayout";
import CategoriesProvider from "./context/CategoriesProvider";
import ArticlesProvider from "./context/ArticlesProvider";
import StoragePage from "./pages/StoragePage";

function App() {
  return (
    <CategoriesProvider>
      <ArticlesProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="articles/:id" element={<ArticlePage />} />
            <Route path="storage" element={<StoragePage />} />
          </Route>
          <Route element={<NoQrLayout />}>
            <Route path="create" element={<Create />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </ArticlesProvider>
    </CategoriesProvider>
  );
}

export default App;
