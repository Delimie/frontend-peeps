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
import ProfSet from "../components/SidebarSet/Settings/ProfSet";
import PassSet from "../components/SidebarSet/Settings/PassSet";
import CardSet from "../components/SidebarSet/Settings/CardSet";
import Transactions from "../components/SidebarSet/Settings/Transactions";
import TestPeeps from "../pages/TestAddGroup";
import Overview from "../pages/Overview";
import MainContainer from "../components/Peeps/MainContainer";

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
          {/* <Route path="notfound" element={<NotFound />} /> */}

          <Route path="ProfSet" element={<ProfSet />} />
          <Route path="PassSet" element={<PassSet />} />
          <Route path="CardSet" element={<CardSet />} />
          <Route path="Transactions" element={<Transactions />} />

          {/* <Route element={<ProtectRouteUser />}> */}
          <Route path="profile" element={<Profile />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="payment" element={<Payment />} />
          <Route path="overview" element={<Overview />} />

          <Route path="peeps" element={<TestPeeps />} />
          <Route path="peeps/:groupId" element={<MainContainer />} />
          <Route path="peeps/:groupId/:tab" element={<MainContainer />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
