import React, { FC } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Login_Signup: FC = () => {
  return (
    <div className="form-block__input-wrapper">
      <Login />
      <Signup />
    </div>
  );
};

export default Login_Signup;
