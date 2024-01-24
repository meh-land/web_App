import { useEffect, useState } from "react";
import "./DarkLight_Toggle.css";

export default function DarkLight_Toggle() {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleClick = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  useEffect(() => {
    const body = document.body;
    if (!isChecked) {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    }
  }, [isChecked]);

  return (
    <>
      <input
        id="toggle"
        className="toggle"
        type="checkbox"
        checked={isChecked}
        onChange={handleClick}
      />
    </>
  );
}
