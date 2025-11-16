import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import AskAI from "./pages/AskAI";
import Tickets from "./pages/Tickets";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Toast from "./components/Toast";

export default function App() {
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
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
          <Link to="/articles">Articles</Link>
          <Link to="/ask">Ask AI</Link>
          <Link to="/tickets">Tickets</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          {user ? (
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles setToast={setToast} />} />
          <Route path="/ask" element={<AskAI setToast={setToast} />} />
          <Route path="/tickets" element={<Tickets setToast={setToast} />} />
          <Route path="/admin" element={<Admin setToast={setToast} />} />
          <Route path="/login" element={<Login setToast={setToast} />} />
          <Route path="/register" element={<Register setToast={setToast} />} />
        </Routes>
      </main>
      <Toast message={toast} />
    </>
  );
}
