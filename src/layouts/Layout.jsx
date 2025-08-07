import React from "react";
import MainNav from "../components/MainNav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div>
      <MainNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
