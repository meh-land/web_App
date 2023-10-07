import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import Context from "../../Context";

export default function Navbar() {
  const { logged_in, setLoggedIn, userData, setUserData } = useContext(Context);

  useEffect(() => {
    console.log(userData); // This will log the updated userData
  }, [userData]);

  const logout = () => {
    setLoggedIn(!logged_in);
    setUserData({ user_id: "", name: "", email: "" });
  };

  return (
    <Link to={logged_in ? "/" : "/Membership"} onClick={logout}>
      {logged_in ? "Log Out" : "Login / Signup"}
    </Link>
  );
}
