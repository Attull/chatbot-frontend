import React from "react";

export default function Card({ title, children }) {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
