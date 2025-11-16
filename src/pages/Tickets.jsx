import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Tickets({ setToast }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [tickets, setTickets] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function createTicket() {
    if (!form.title.trim()) {
      setToast("Title is required");
      return;
    }
    try {
      await apiRequest("/tickets", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setToast("Ticket created");
      setForm({ title: "", description: "", priority: "low" });
      loadTickets();
    } catch (e) {
      setToast(e.message);
    }
  }

  async function loadTickets() {
    try {
      const data = await apiRequest("/tickets/mine");
      setTickets(data);
    } catch (e) {
      setToast(e.message);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div>
      <h1>Tickets</h1>

      <Card title="Create Ticket">
        <div>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <Button onClick={createTicket}>Submit Ticket</Button>
      </Card>

      <h2>My Tickets</h2>
      {tickets.map((t) => (
        <Card key={t._id} title={t.title}>
          <p>{t.description}</p>
          <p>Priority: {t.priority}</p>
          <p>Status: {t.status}</p>
        </Card>
      ))}
    </div>
  );
}
