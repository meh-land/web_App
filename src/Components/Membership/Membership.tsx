import {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Context from "../../Context";
import Loader from "../Loader/Loader";
import { gsap } from "gsap";
import Login from "./Login";
import Signup from "./Signup";
import "./Membership.css";

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

  const toggleAction = () => {
    var newAction = action === "login" ? "signup" : "login";
    setAction(newAction);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="Membership">
      <div
        ref={boxRef}
        className={action === "login" ? "wrapper" : "wrapper active"}
      >
        <Login handleClick={toggleAction} />
        <Signup handleClick={toggleAction} />
      </div>
    </div>
  );
};

export default Membership;
