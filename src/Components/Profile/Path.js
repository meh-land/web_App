import { Link } from "react-router-dom";

export default function Path({ path }) {
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
}
