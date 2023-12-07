import React, { FC, useContext, useEffect } from "react";
import Context from "../../Context";
import Loader from "./../Loader/Loader";
import Path from "../Path/Path";
import Navbar from "../Navbar/Navbar";
import Test from "../TestingInterface/Test";
import "./Home.css";
import Cookies from "js-cookie";

const Home: FC = () => {
  const { isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("loading");
    }, 3000);
  }, []);

  useEffect(() => {
    // Read a cookie by name
    const cookieValue = Cookies.get("username");

    if (cookieValue) {
      // Do something with the cookie value
      console.log("Cookie Value:", cookieValue);
    }
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="main_content dashboard_part">
      <Navbar />
      <Path title="Home" />
      <Test />
    </section>
  );
};

export default Home;
