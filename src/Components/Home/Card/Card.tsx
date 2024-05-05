import React, { FC, ReactNode } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

interface CardProps {
  className: string;
  icon?: string;
  title: string;
  description: string;
  svg?: ReactNode;
  path: string;
}

const Card: FC<CardProps> = ({
  className,
  icon,
  title,
  description,
  svg,
  path,
}) => {
  return (
    <Link to={path}>
      <section className={`custom-section m-2 text-white ${className}`}>
        <div className="custom-icon">
          <i className={`bx ${icon} fs-3`}>{svg}</i>
        </div>
        <div className="custom-content">
          <h1 className="custom-title">{title}</h1>
          <p className="custom-description">{description}</p>
        </div>
      </section>
    </Link>
  );
};

export default Card;
