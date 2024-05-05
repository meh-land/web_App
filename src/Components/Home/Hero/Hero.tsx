import React, { FC, useContext, useEffect, useState } from "react";
import "./Hero.css";
import Context from "../../../Context";

const Hero: FC = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const { isChecked } = useContext(Context);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
      }).format(now);

      setCurrentTime(time);
      setCurrentDate(date);
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={`hero-section ${isChecked ? "light" : "dark"}`}>
      <div className="hero-content">
        <div className="hero-header">
          <h1 className="hero-time">{currentTime}</h1>
          <p className="hero-date">{currentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
