import React, { FC } from "react";
import empty from "../../images/empty.png";
import "./Empty.css";

interface EmptyProps {
  text: string;
}

const Empty: FC<EmptyProps> = ({ text }) => {
  return (
    <div className="empty-state">
      <div className="empty-state__content">
        <div className="empty-state__icon">
          <img src={empty} alt="Empty state icon" />
        </div>
        <div className="empty-state__message">
          No {text} has been added yet.
        </div>
      </div>
    </div>
  );
};

export default Empty;
