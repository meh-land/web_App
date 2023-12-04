import axios from "axios";
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Context from "../../Context";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  fullname: string;
  email: string;
  password: string;
}

interface FormData {
  fullname: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface Props {
  handleClick: () => void;
}

const Signup: FC<Props> = ({ handleClick }) => {
  const { logged_in, setLoggedIn, userData, setUserData } = useContext(Context);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async () => {
    try {
      axios
        .post(`http://127.0.0.1/apicrud/addusers.php`, {
          fullname: userData.fullname,
          email: userData.email,
          password: userData.password,
        })
        .then((res) => {
          setLoggedIn(res.data.status);
          navigate(`/`);
          console.log(userData);
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="form-wrapper sign-up">
      <form onSubmit={handleSubmit(signup)}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <input
            type="text"
            id="fullname"
            placeholder=" "
            {...register("fullname", {
              required: true,
              pattern: /^[A-Za-z]+$/,
              onChange: onChangeValue,
            })}
          />
          <label htmlFor="fullname">Username</label>
        </div>
        {errors.fullname && (
          <p className="error-msg ">
            {errors.fullname.type === "pattern"
              ? "No numbers or special characters allowed"
              : "This field is required"}
          </p>
        )}
        <div className="input-group">
          <input
            type="email"
            id="email"
            placeholder=" "
            {...register("email", { required: true, onChange: onChangeValue })}
          />
          <label htmlFor="">Email</label>
        </div>
        {errors.email && <p className="error-msg">This field is required</p>}
        <div className="input-group">
          <input
            type="password"
            id="createpassword"
            placeholder=" "
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
              onChange: onChangeValue,
            })}
          />
          <label htmlFor="">Password</label>
        </div>
        {errors.password && (
          <p className="error-msg">
            {errors.password.type === "minLength"
              ? "Password must be 8 characters long"
              : errors.password.type === "pattern"
              ? "password must include at least one uppercase, one lowercase, one number and one special character."
              : "This field is required"}
          </p>
        )}
        <div className="input-group">
          <input
            type="password"
            id="confirm_password"
            placeholder=" "
            {...register("confirm_password", {
              required: true,
              validate: (value) =>
                value ===
                (document.getElementById("createpassword") as HTMLInputElement)
                  .value,
            })}
          />
          <label htmlFor="">Confirm Password</label>
        </div>
        {errors.confirm_password && (
          <p className="error-msg ">
            {errors.confirm_password.type === "validate"
              ? "Passwords don't match"
              : "This field is required"}
          </p>
        )}

        <button className="mt-3" type="submit">
          Sign Up
        </button>
        <div className="signUp-link">
          <p>
            Already have an account?
            <span onClick={handleClick} className="SignInBtn-link">
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
