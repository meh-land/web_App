import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import "./Navbar.css";
import Dropdown from "../UserDropdown/UserDropDown";
import CircleBtn from "../Circlebtn/Circlebtn";

export default function Navbar() {
  const [effect, seteffect] = useState(false);
  const { logged_in, setLoggedIn, userData, setUserData, sidebar, IsOpen } =
    useContext(Context);

  const OpenSidebar = () => {
    IsOpen((leftSidebar) => !leftSidebar);
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
            <div className="ms-auto p-2 bd-highlight">
              <Dropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /*   return (
    <>
      <div id="header" classNameName="d-flex bd-highlight mb-3">
        <div classNameName="header">
          <div classNameName="header_in">
            <div classNameName="trigger_logo">
              <CircleBtn clickHandler={OpenSidebar} active={sidebar} />
              <div classNameName="logo">
                <h5>Welcome Back , {userData.name}</h5>
              </div>
            </div>

            <div classNameName="wallet">
              <Dropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  ); */
}
