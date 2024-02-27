import { FC } from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";

const Header: FC = () => {
  return (
    <div className="position-relative iq-banner">
      <Welcome />
    </div>
  );
};

export default Header;
