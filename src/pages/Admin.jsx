import React, { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Admin({ setToast }) {
  const [pdfFile, setPdfFile] = useState(null);

  async function uploadPDF() {
    if (!pdfFile) {
      setToast("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const res = await fetch("http://localhost:5000/api/pdf/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setToast(
        data.chunksAdded
          ? `Ingested ${data.chunksAdded} chunks`
          : data.message || "PDF ingestion failed..."
      );
      setPdfFile(null);
    } catch (e) {
      setToast("PDF upload failed");
    }
  }

  return (
    <div>
      <h1>Admin Panel</h1>

      <Card title="Upload PDF for AI Ingestion">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
        <Button onClick={uploadPDF} style={{ marginTop: "10px" }}>
          Upload & Ingest PDF
        </Button>
      </Card>
    </div>
  );
}
