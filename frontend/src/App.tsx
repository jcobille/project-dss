import React from "react";
import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/MovieDetailsPage";
import HeaderNavigation from "./Header";
import ProtectedRoutes from "./ProtectedRoute";
import { MovieList } from "./components/admin/MovieList";
import { ActorList } from "./components/admin/ActorList";
import { UserList } from "./components/admin/UserList";
import ActorPage from "./pages/ActorPage";
import { PageNotExist } from "./pages/PageNotExist";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderNavigation />}>
          <Route index element={<HomePage />} />
          <Route path="/movie/details/:id" element={<DetailsPage />} />
          <Route path="/actor/details/:id" element={<ActorPage />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/admin/movies" element={<MovieList />} />
            <Route path="/admin/actors" element={<ActorList />} />
            <Route path="/admin/users" element={<UserList />} />
          </Route>
          <Route path="*" element={<PageNotExist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
