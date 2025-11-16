import React from "react";

export default function Toast({ message, type = "info" }) {
  if (!message) return null;
  return <div className={`toast toast-${type}`}>{message}</div>;
}
