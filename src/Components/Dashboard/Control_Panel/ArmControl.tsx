import React, { FC, useEffect, useRef } from "react";
import Input from "../Input_Field/Input_Field";

const ArmControl: FC = () => {
  const attributes = ["Kp", "Ki", "Kd"];
  const mouseclickRef = useRef(new Audio());

  useEffect(() => {
    mouseclickRef.current.src =
      "https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav";
    mouseclickRef.current.preload = "auto";
  }, []);

  const handleMouseDown = () => {
    mouseclickRef.current
      .play()
      .catch((e) => console.error("Error playing audio:", e));
  };

  return (
    <div className="form-wrapper">
      <h5>Arm Control:</h5>
      <form className="d-flex justify-content-between"></form>
    </div>
  );
};

export default ArmControl;
