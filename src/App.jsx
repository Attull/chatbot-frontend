import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import AskAI from "./pages/AskAI";
import Tickets from "./pages/Tickets";
import Admin from "./pages/Admin";
import Toast from "./components/Toast";

export default function App() {
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    setToast("Logged out");
    navigate("/login");
  };

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <>
      <header>
        <div>MERN & AI Accelerator</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/ask">Ask AI</Link>
          <Link to="/upload">Upload PDF</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles setToast={setToast} />} />
          <Route path="/ask" element={<AskAI setToast={setToast} />} />
          <Route path="/tickets" element={<Tickets setToast={setToast} />} />
          <Route path="/upload" element={<Admin setToast={setToast} />} />
        </Routes>
      </main>
      <Toast message={toast} />
    </>
  );
}
