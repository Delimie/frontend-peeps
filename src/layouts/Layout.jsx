import React from "react";
import MainNav from "../components/MainNav";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <MainNav />
      <Outlet />
    </div>
  );
}

export default Layout;
