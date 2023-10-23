import { useContext, useEffect } from "react";
import Context from "../../Context";
import Loader from "../../Loader/Loader";
import Path from "../Path/Path";
import Navbar from "../Navbar/Navbar";
import Test from "../TestingInterface/Test";

export default function Home() {
  const { isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("loading");
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Path title="Home" />
          <Test />
        </>
      )}
    </>
  );
}
