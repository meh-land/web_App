import React, { FC, useContext, useEffect } from "react";
import Context from "../../Context";
import Loader from "./../Loader/Loader";
import Path from "../Path/Path";
import Navbar from "../Navbar/Navbar";
import Test from "../TestingInterface/Test";
import "./Home.css";

const Home: FC = () => {
  const { isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("loading");
    }, 3000);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="main_content dashboard_part">
      <Navbar />
      <Path title="Home" />
      <Test />
    </div>
  );
};

export default Home;
