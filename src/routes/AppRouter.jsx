import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Layout from "../layouts/Layout";
import Peeps from "../pages/Peeps";
import NewRegister from "../pages/NewRegister";
import Pricing from "../pages/Pricing";
import Payment from "../pages/Payment";
import BubbleBox from "../components/BubbleBox";
import About from "../pages/About";
import Profile from "../pages/authUser/Profile";
import PassSet from "../components/SidebarSet/Settings/PassSet";
import PaymentsSet from "../components/SidebarSet/Settings/PaymentsSet";
import DisplaySet from "../pages/authUser/DisplaySet";
import TestPeeps from "../pages/TestAddGroup";
import Overview from "../pages/Overview";
import HomePeeps from "../pages/HomePeeps";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="peeps2" element={<Peeps />} />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="newregister" element={<NewRegister />} />
          <Route path="about" element={<About />} />
          <Route path="bubble" element={<BubbleBox />} />
          {/* <Route path="*" element={<NotFound />} /> */}

          <Route path="PassSet" element={<PassSet />} />
          <Route path="PaymentsSet" element={<PaymentsSet />} />
          <Route path="Display" element={<DisplaySet />} />

          {/* <Route element={<ProtectRouteUser />}> */}
          <Route path="profile" element={<Profile />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="payment" element={<Payment />} />
          <Route path="overview" element={<Overview />} />

          <Route path="peeps" element={<HomePeeps/>} />
          <Route path="peeps/:groupId" element={<TestPeeps />} />
          <Route path="peeps/:groupId/:channelId" element={<TestPeeps />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
