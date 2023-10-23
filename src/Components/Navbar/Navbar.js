import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import CircleBtn from "../Circlebtn/Circlebtn";
import "./Navbar.css";

export default function Navbar() {
  const [effect, seteffect] = useState(false);
  const { logged_in, setLoggedIn, userData, setUserData } = useContext(Context);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        seteffect(window.pageYOffset > 10)
      );
    }
  }, []);

  return (
    <>
      <header id="header" className="d-flex bd-highlight mb-3">
        <div className="header">
          <div className="header_in">
            <div className="trigger_logo">
              <div className="logo">
                <h5>Welcome Back , {userData.name}</h5>
              </div>
            </div>

            <div className="wallet">
              <CircleBtn />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
