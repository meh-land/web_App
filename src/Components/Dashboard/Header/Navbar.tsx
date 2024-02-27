import { FC } from "react";
import "./Navbar.css";

import DarkLight_Toggle from "../../Dark_Light_Toggle/Dark_Light_Toggle";

const Navbar: FC = () => {
  return (
    <nav className="container-fluid g-0 h-1">
      <div className="row">
        <div className="col-lg-12 p-0">
          <div className="header_iner d-flex bd-highlight mb-3 align-items-center">
            <div className="p-2 bd-highlight ">
              <h3 className="m-0 logo">LOGO</h3>
            </div>

            <div className="ms-auto p-2 bd-highlight d-flex align-items-center">
              <DarkLight_Toggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
