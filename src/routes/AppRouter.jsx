import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Layout from "../layouts/Layout";
import Profile from "../pages/authUser/Profile";
import Peeps from "../pages/Peeps";
import NewRegister from "../pages/NewRegister";
import Pricing from "../pages/Pricing";
import Payment from "../pages/Payment";
import About from "../pages/About";
import BubbleBox from "../components/BubbleBox";
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="peeps" element={<Peeps />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="newregister" element={<NewRegister />} />
          <Route path="about" element={<About />} />
          <Route path="bubble" element={<BubbleBox />} />
          <Route path="notfound" element={<NotFound />} />

          {/* <Route element={<ProtectRouteUser />}> */}
          <Route path="profile" element={<Profile />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="payment" element={<Payment />} />

          {/* <Route path="community" element={<Community />} /> */}
          {/* </Route>

          {/* <Route element={<ProtectRouteAdmin />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>  */}
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
