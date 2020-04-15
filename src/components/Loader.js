import React from "react";

export default function Loader({ show }) {
  return (
    <div
      className="loader"
      style={show ? { display: "block" } : { display: "none" }}
    >
      <div class="dot dot-1"></div>
      <div class="dot dot-2"></div>
      <div class="dot dot-3"></div>
    </div>
  );
}
