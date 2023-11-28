import React, { FC } from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  handleBtnClick: () => void;
  full?: string;
}

const Button: FC<ButtonProps> = ({ text, handleBtnClick, full }) => (
  <button className={`metaportal_fn_button ${full}`} onClick={handleBtnClick}>
    <span>{text}</span>
  </button>
);

export default Button;
