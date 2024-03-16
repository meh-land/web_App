import { FC, useContext, useEffect } from "react";
import Context from "../../Context";
import Loader from "./../Loader/Loader";
import Navbar from "../Navbar/Navbar";
import Test from "../TestingInterface/Test";
import "./Home.css";
import Flow from "../Maps/CreateMaps";

const Home: FC = () => {
  const {
    isLoading,
    setIsLoading,
    logged_in,
    setLoggedIn,
    userData,
    setUserData,
    setCookie,
    removeCookie,
  } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("loading");
    }, 3000);
  }, []);

  useEffect(() => {
    if (logged_in === true) {
      setCookie("rememberMe", true, {
        path: "/",
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });
      for (const key in userData) {
        setCookie(key, userData[key], {
          path: "/",
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
      }
    }
  }, [userData]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="main_content dashboard_part">
      <Navbar />
      {/* <Test /> */}
    </div>
  );
};

export default Home;
