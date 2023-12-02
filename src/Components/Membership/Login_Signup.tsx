import React, { FC } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Login_Signup: FC = () => {
  return (
    <div className="form-block__input-wrapper">
      <Login />
      <Signup />
    </div>
  );
};

export default Login_Signup;
