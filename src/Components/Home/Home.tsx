import { FC, useContext, useEffect } from "react";
import Context from "../../Context";
import Loader from "./../Loader/Loader";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Hero from "./Hero/Hero";
import Card from "./Card/Card";

const Home: FC = () => {
  const { isLoading, setIsLoading, logged_in, userData, setCookie } =
    useContext(Context);

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
      <Hero />
      <section className="d-flex flex-wrap justify-content-evenly">
        <Card
          path="/robots"
          className="bg-pink"
          title="Robots"
          description="Dynamically manage and monitor robots."
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455M5 20V8h14l.001 3.996L19 12v2l.001.005l.001 5.995z"
              />
              <ellipse cx="8.5" cy="12" fill="currentColor" rx="1.5" ry="2" />
              <ellipse cx="15.5" cy="12" fill="currentColor" rx="1.5" ry="2" />
              <path fill="currentColor" d="M8 16h8v2H8z" />
            </svg>
          }
        />
        <Card
          path="/maps"
          className="bg-grey"
          title="Maps"
          description="facilitate customizing and managing paths."
          icon="bx-map"
        />
        <Card
          path="/tasks"
          className="bg-blue"
          title="Tasks"
          description="Flexible interface for task management."
          icon="bx-task"
        />
      </section>
    </div>
  );
};

export default Home;
