import React from "react";
import { MainPage } from "../MainPage";
import { Route, Routes } from "react-router-dom";
import { apiService } from "../../services";
import { useAuth } from "../../hooks";
import { ActivityPage } from "../ActivityPage";
import { ProfilePage } from "../ProfilePage";
import { MainLayout } from "../MainLayout/MainLayout";

export function App() {
  const { setUser, setAuth } = useAuth();

  React.useEffect(() => {
    apiService
      .getCurrentUser()
      .then((user) => {
        setUser(user);
        setAuth(true);
      })
      .catch(() => {
        setAuth(false);
        setUser(null);
        localStorage.clear();
      });
  }, [setAuth, setUser]);

  return (
    <MainLayout>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/:slug"} element={<ActivityPage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
      </Routes>
    </MainLayout>
  );
}
