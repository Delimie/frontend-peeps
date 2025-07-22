import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Layout from "../layouts/Layout";
import Peeps from "../pages/Peeps";

function AppRouter() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="peeps" element={<Peeps />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            {/* <Route element={<ProtectRouteUser />}>
              <Route path="mytask" element={<MyTaskPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="community" element={<Community />} />
            </Route>

            <Route element={<ProtectRouteAdmin />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route> */}
          </Route>
        </Routes>
    </>
  );
}

export default AppRouter;
