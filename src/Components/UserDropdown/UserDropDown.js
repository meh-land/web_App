import { useState, useEffect, useContext } from "react";
import "./userDropDown.css";
import { Link } from "react-router-dom";
import Context from "../../Context";
import { useCookies } from "react-cookie";

export default function Dropdown() {
  const [active, setActive] = useState(false);
  const { logged_in, setLoggedIn, userData, setUserData } = useContext(Context);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    console.log(userData); // This will log the updated userData
    if (logged_in === true) {
      for (const key in userData) {
        setCookie(key, userData[key], {
          path: "/",
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
      }
    }
  }, [userData]);

  const handleClick = () => {
    setActive(!active);
  };

  const logout = () => {
    setLoggedIn(!logged_in);
    setUserData({ user_id: "", name: "", email: "", password: "" });
    for (const key in userData) {
      removeCookie(key, { path: "/" });
    }
  };

  return (
    <div className="User-area">
      <div className="User-avtar" onClick={handleClick}>
        <div className="circle">{userData.name[0]}</div>
      </div>
      <ul className={!active ? "User-Dropdown" : "User-Dropdown U-open"}>
        <li>
          <Link to="/Profile">My Profile</Link>
        </li>
        <li>
          <Link to="/">Projects</Link>
        </li>
        <li>
          <Link to="/Membership" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
