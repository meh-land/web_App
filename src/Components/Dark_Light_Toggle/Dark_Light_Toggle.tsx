import { useContext, useEffect } from "react";
import "./DarkLight_Toggle.css";
import Context from "../../Context";

export default function DarkLight_Toggle() {
  const { isChecked, setIsChecked } = useContext(Context);

  const handleClick = () => {
    setIsChecked((isChecked: boolean) => !isChecked);
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
