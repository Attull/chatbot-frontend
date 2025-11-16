import React from "react";

export default function Button({ children, variant = "primary", ...rest }) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}
