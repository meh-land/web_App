import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Context from "../../Context";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  email: string;
  password: string;
}

const Login: FC = () => {
  const {
    logged_in,
    setLoggedIn,
    userData,
    setUserData,
    isLoading,
    setIsLoading,
  } = useContext(Context);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserInfo>();

  const [userInfo, setuserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    setIsLoading(true);

    axios
      .post(`http://127.0.0.1/apicrud/getuser.php`, {
        email: userInfo.email,
        password: userInfo.password,
      })
      .then((res) => {
        setLoggedIn(res.data.status);
        const user = res.data.user;
        setUserData(user);
        navigate(`/`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <form
      className="form-group form-group--login"
      onSubmit={handleSubmit(login)}
    >
      <input
        className="form-group__input"
        type="email"
        id="email"
        placeholder="Email"
        {...register("email", { required: true, onChange: onChangeValue })}
      />
      {errors.email && <p className="error-msg">This field is required</p>}

      <input
        className="form-group__input"
        type="password"
        id="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          minLength: 8,
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
          onChange: onChangeValue,
        })}
      />
      {errors.password && (
        <p className="error-msg">
          {errors.password.type === "minLength"
            ? "Password must be 8 characters long"
            : errors.password.type === "pattern"
            ? "Password must include at least one uppercase, one lowercase, one number, and one special character."
            : "This field is required"}
        </p>
      )}

      <button
        className="button form-group__input button--primary full-width"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
