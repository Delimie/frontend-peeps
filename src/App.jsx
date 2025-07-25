import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import './index.css'

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" style={{ zIndex: 9999 }} />
      <AppRouter />
    </>
  );
}

export default App;
