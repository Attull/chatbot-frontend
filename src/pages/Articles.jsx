import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Button from "../components/Button";

export default function Articles({ setToast }) {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);

  async function loadArticles() {
    try {
      const data = await apiRequest(`/articles?q=${encodeURIComponent(query)}`);
      setArticles(data.items);
    } catch (e) {
      setToast(e.message);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={loadArticles}>Search</Button>
      </div>

      {articles.map((a) => (
        <Card key={a._id} title={a.title}>
          <p>{a.summary}</p>
          <Button variant="secondary" onClick={() => setSelected(a)}>
            View
          </Button>
        </Card>
      ))}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
      >
        <p>{selected?.body}</p>
      </Modal>
    </div>
  );
}
