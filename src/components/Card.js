import React from "react";

export default function Card({ onClick, imgSrc, data, selected }) {
  return (
    <div
      className={`card ${selected ? "green-border" : "red-border"}`}
      onClick={onClick}
    >
      <img src={imgSrc} alt="Avatar" style={{ width: "100%" }} />
      <div className="container">
        <h4>
          <b>{`${data.name}  ${data.width}x${data.height}`}</b>
        </h4>
        <h3 className={selected ? "flag-green" : "flag-red"}>
          {selected ? "Selected" : "Select"}
        </h3>
      </div>
    </div>
  );
}
