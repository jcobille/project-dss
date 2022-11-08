import React from "react";
import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import DetailsPage from "./components/DetailsPage";
import HeaderNavigation from "./Header";
import ProtectedRoutes from "./ProtectedRoute";
import { MovieList } from "./components/admin/MovieList";
import { PageNotExist } from "./components/PageNotExist";
import { ActorList } from "./components/admin/ActorList";
import { UserList } from "./components/admin/UserList";
import ActorPage from "./components/ActorPage";

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
