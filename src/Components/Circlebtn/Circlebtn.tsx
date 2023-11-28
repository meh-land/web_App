import React, { FC } from "react";
import "./Circlebtn.css";

interface CircleBtnProps {
  active: Boolean;
  clickHandler: () => void;
}

const CircleBtn: FC<CircleBtnProps> = ({ clickHandler, active }) => {
  return (
    <div className={`trigger${active ? " active" : ""}`} onClick={clickHandler}>
      <span />
    </div>
  );
};

export default CircleBtn;
