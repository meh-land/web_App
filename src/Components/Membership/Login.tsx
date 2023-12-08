import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Context from "../../Context";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface UserInfo {
  email: string;
  password: string;
}

interface Props {
  handleClick: () => void;
}

const Login: FC<Props> = ({ handleClick }) => {
  const [cookies, setCookie] = useCookies<string>(["user"]);

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

        if (logged_in === true) {
          for (const key in user) {
            setCookie(key, user[key], {
              path: "/",
              expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            });
          }
        }

        navigate(`/`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="form-wrapper sign-in">
      <form onSubmit={handleSubmit(login)}>
        <h2>Sign In</h2>
        <div className="input-group">
          <input
            type="email"
            id="email"
            placeholder=" "
            {...register("email", { required: true, onChange: onChangeValue })}
          />
          <label htmlFor="email">Email</label>
        </div>
        {errors.email && <p className="error-msg ">This field is required</p>}

        <div className="input-group">
          <input
            type="password"
            id="password"
            placeholder=" "
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
              onChange: onChangeValue,
            })}
          />
          <label htmlFor="password">Password</label>
        </div>
        {errors.password && (
          <p className="error-msg">
            {errors.password.type === "minLength"
              ? "Password must be 8 characters long"
              : errors.password.type === "pattern"
              ? "Password must include at least one uppercase, one lowercase, one number, and one special character."
              : "This field is required"}
          </p>
        )}
        <div className="remember">
          <label>
            <input
              type="checkbox"
              checked={logged_in}
              onChange={() => {
                setLoggedIn(!logged_in);
              }}
            />
            Remember me
          </label>
        </div>
        <button type="submit">Sign In</button>
        <div className="signUp-link">
          <p>
            Don't have an account?
            <span className="SignUpBtn-link" onClick={handleClick}>
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
