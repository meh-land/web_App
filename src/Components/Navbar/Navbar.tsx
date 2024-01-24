import { Link, useLocation } from "react-router-dom";
import { FC, useContext, useEffect, useState } from "react";
import Context from "../../Context";
import "./Navbar.css";
import Dropdown from "../UserDropdown/UserDropDown";
import CircleBtn from "../Circlebtn/Circlebtn";
import DarkLight_Toggle from "../Dark_Light_Toggle/Dark_Light_Toggle";

const Navbar: FC = () => {
  const [effect, seteffect] = useState<boolean>(false);
  const { logged_in, setLoggedIn, userData, sidebar, IsOpen } =
    useContext(Context);

  const OpenSidebar = () => {
    IsOpen((sidebar: boolean) => !sidebar);
  };

  return (
    <div className="container-fluid g-0">
      <div className="row">
        <div className="col-lg-12 p-0">
          <div className="header_iner d-flex bd-highlight mb-3 align-items-center">
            <div className="p-2 bd-highlight d-lg-none">
              <CircleBtn clickHandler={OpenSidebar} active={sidebar} />
            </div>
            <div className="p-2 bd-highlight logo d-lg-none">
              <h3 className="m-0">LOGO</h3>
            </div>
            <div className="p-2 bd-highlight username d-none d-lg-block">
              <h5>Welcome Back , {userData.name}</h5>
            </div>
            <div className="ms-auto p-2 bd-highlight d-flex align-items-center">
              <DarkLight_Toggle />
              <Dropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
