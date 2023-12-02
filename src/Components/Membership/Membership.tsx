import { FC, useContext, useEffect, useLayoutEffect, useRef } from "react";
import Context from "../../Context";
import { useState } from "react";
import Login_Signup from "./Login_Signup";
import Loader from "../Loader/Loader";
import { gsap } from "gsap";

const Membership: FC = () => {
  const [action, setAction] = useState<string>("login");

  const { isLoading, setIsLoading } = useContext(Context);

  const boxRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("loading");
    }, 3000);
  }, []);

  useLayoutEffect(() => {
    console.log(boxRef.current);
    setTimeout(() => {
      gsap.from(boxRef.current, {
        autoAlpha: 0,
        duration: 1.5,
        scale: 0,
        ease: "bounce.out",
      });
    }, 3010);
  }, []);

  const toggleAction = () => {
    var newAction = action === "login" ? "signup" : "login";
    setAction(newAction);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className={`app app--is-${action}`}>
        <div>
          <div
            className={`form-block-wrapper form-block-wrapper--is-${action}`}
          ></div>
          <section
            ref={boxRef}
            className={`form-block form-block--is-${action}`}
          >
            <header className="form-block__header">
              <h1>{action === "login" ? "Welcome back!" : "Sign up"}</h1>
              <div className="form-block__toggle-block">
                <span>
                  {action === "login" ? "Don't" : "Already"} have an account?
                  Click here &#8594;
                </span>
                <input
                  id="form-toggler"
                  type="checkbox"
                  onClick={toggleAction}
                />
                <label htmlFor="form-toggler"></label>
              </div>
            </header>
            <Login_Signup />
          </section>
        </div>
      </div>
    </>
  );
};

export default Membership;
