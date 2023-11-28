import { FC } from "react";
import { Link } from "react-router-dom";

interface PathProps {
  path: string;
}

const Path: FC<PathProps> = ({ path }) => {
  return (
    <nav aria-label="breadcrumb" className="main-breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/Profile">My Profile</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {path}
        </li>
      </ol>
    </nav>
  );
};

export default Path;
