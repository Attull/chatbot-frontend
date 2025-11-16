import React, { useState } from "react";
import { apiRequest } from "../api";
import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Login({ setToast }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("access", res.access);
      localStorage.setItem("user", JSON.stringify(res.user));
      setToast("Logged in");
      navigate("/");
    } catch (e) {
      setToast(e.message);
    }
  }

  return (
    <Card title="Login">
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <Button onClick={submit}>Login</Button>
    </Card>
  );
}
