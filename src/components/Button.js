import React from "react";

const Button = ({ children, onClick, secondary }) => {
  const clsName = secondary ? "secondary" : "primary";
  return (
    <button className={`btn ${clsName}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
