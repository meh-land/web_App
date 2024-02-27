import axios from "axios";
import { FC, useContext, useState } from "react";
import Context from "../../Context";

const Test: FC = () => {
  const {IP} = useContext(Context);
  
  const test = (state: string): void => {
    axios
      .get(`http://${IP}:8000/api/test`, {
        params: { state: state },
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
        onClick={() => test("forward")}
      >
        Forward
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => test("backward")}
      >
        Backward
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => test("right")}
      >
        Right
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => test("left")}
      >
        Left
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => test("stop")}
      >
        Stop
      </button>
    </div>
  );
};

export default Test;
