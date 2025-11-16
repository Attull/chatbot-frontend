import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Admin({ setToast }) {
  const [form, setForm] = useState({ title: "", body: "", tags: "" });
  const [articles, setArticles] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function loadArticles() {
    const data = await apiRequest("/articles");
    setArticles(data.items);
  }

  async function createArticle() {
    try {
      const payload = {
        title: form.title,
        body: form.body,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      await apiRequest("/articles", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setToast("Article created");
      setForm({ title: "", body: "", tags: "" });
      loadArticles();
    } catch (e) {
      setToast(e.message);
    }
  }

  async function ingest() {
    try {
      await apiRequest("/ai/ingest", { method: "POST" });
      setToast("Ingest completed");
    } catch (e) {
      setToast(e.message);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div>
      <h1>Admin</h1>

      <Card title="Create / Edit Article (Mock)">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
        />
        <p>
          <strong>Preview:</strong> {form.body.slice(0, 160)}...
        </p>
        <Button onClick={createArticle}>Save Article</Button>
      </Card>

      <Button variant="secondary" onClick={ingest}>
        Ingest Articles for AI
      </Button>

      <h2>Existing Articles</h2>
      {articles.map((a) => (
        <Card key={a._id} title={a.title}>
          <p>{a.summary}</p>
        </Card>
      ))}
    </div>
  );
}
