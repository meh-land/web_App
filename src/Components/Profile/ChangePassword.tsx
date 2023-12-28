import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Profile.css";
import Context from "../../Context";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

interface ChangePasswordProps {
  currentPassword: string;
  NewPassword: string;
  ConfirmNewPassword: string;
}

const ChangePassword: FC = () => {
  const { userData, setUserData, setIsLoading } = useContext(Context);
  const [newPassword, setNewPassword] = useState<string>("");
  const [errortext, setErrorText] = useState<string>("");
  const [currentPasswordVisible, setCurrentPasswordVisible] =
    useState<boolean>(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordProps>();

  const [cookies, setCookie] = useCookies<string>(["user"]);

  const handleToggle = (field: string) => {
    switch (field) {
      case "currentPassword":
        setCurrentPasswordVisible(!currentPasswordVisible);
        break;
      case "NewPassword":
        setNewPasswordVisible(!newPasswordVisible);
        break;
      case "ConfirmNewPassword":
        setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://127.0.0.1/apicrud/changePassword.php",
        {
          password: newPassword,
          user_id: userData.user_id,
        }
      );
      console.log(newPassword);
      if (response.data.status === true) {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsLoading(false);
        setUserData({ ...userData, password: newPassword });
        setCookie("password", newPassword, {
          path: "/",
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
      } else {
        setErrorText(response.data.msg);
        console.log(response.data.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    setCurrentPasswordVisible(false);
    setNewPasswordVisible(false);
    setConfirmNewPasswordVisible(false);
  };

  return (
    <div id="security">
      <h6>Change Password</h6>
      <hr />
      <form onSubmit={handleSubmit(handlePasswordChange)}>
        <div className="d-flex justify-content-center align-items-center form-control mt-1">
          <input
            type={currentPasswordVisible ? "text" : "password"}
            className="form-control border-0"
            placeholder="Enter your old password"
            {...register("currentPassword", {
              required: true,
              validate: (value) => value === userData.password,
            })}
          />
          <i
            onClick={() => handleToggle("currentPassword")}
            className={`bx bxs-${
              currentPasswordVisible ? "show" : "hide"
            } fs-3`}
          ></i>
        </div>
        {errors.currentPassword && (
          <p className="error-msg">This field is required</p>
        )}
        <div className="d-flex justify-content-center align-items-center form-control mt-3">
          <input
            type={newPasswordVisible ? "text" : "password"}
            className="form-control border-0"
            placeholder="New password"
            id="NewPassword"
            {...register("NewPassword", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
              onChange: (e) => setNewPassword(e.target.value),
            })}
          />
          <i
            onClick={() => handleToggle("NewPassword")}
            className={`bx bxs-${newPasswordVisible ? "show" : "hide"} fs-3`}
          ></i>
        </div>
        {errors.NewPassword && (
          <p className="error-msg">
            {errors.NewPassword.type === "minLength"
              ? "Password must be 8 characters long"
              : errors.NewPassword.type === "pattern"
              ? "password must include at least one uppercase, one lowercase, one number and one special character."
              : "This field is required"}
          </p>
        )}
        <div className="d-flex justify-content-center align-items-center form-control mt-3">
          <input
            type={confirmNewPasswordVisible ? "text" : "password"}
            className="form-control border-0"
            placeholder="Confirm new password"
            {...register("ConfirmNewPassword", {
              required: true,
              validate: (value) =>
                value ===
                (document.getElementById("NewPassword") as HTMLInputElement)
                  .value,
            })}
          />
          <i
            onClick={() => handleToggle("ConfirmNewPassword")}
            className={`bx bxs-${
              confirmNewPasswordVisible ? "show" : "hide"
            } fs-3`}
          ></i>
        </div>
        {errors.ConfirmNewPassword && (
          <p className="error-msg">
            {errors.ConfirmNewPassword.type === "validate"
              ? "Passwords don't match"
              : "This field is required"}
          </p>
        )}
        <hr />
        <button className="btn btn-danger" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
