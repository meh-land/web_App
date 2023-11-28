import axios from "axios";
import { FC, useState } from "react";

const Test: FC = () => {
  const [status, setStatus] = useState<string>("");

  const handleClick = (state: string): void => {
    // Set the status state and then call test function
    setStatus(state);
    test();
  };

  const test = (): void => {
    axios
      .post(`http://127.0.0.1/apicrud/test.php`, {
        status: status,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container d-flex justify-content-evenly">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleClick("forward")}
      >
        Forward
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleClick("backward")}
      >
        Backward
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleClick("right")}
      >
        Right
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleClick("left")}
      >
        Left
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleClick("stop")}
      >
        Stop
      </button>
    </div>
  );
};

export default Test;
