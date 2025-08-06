import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ToastContainer position="bottom-right" style={{ zIndex: 9999 }} />
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;
