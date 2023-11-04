import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Profile.css";
import Context from "../../Context";

export default function ChangePassword() {
  const { userData, setUserData, setIsLoading } = useContext(Context);
  const [newPassword, setNewPassword] = useState("");
  const [errortext, setErrorText] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handlePasswordChange = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://192.168.8.104/apicrud/changePassword.php",
        {
          password: newPassword,
          user_id: userData.user_id,
        }
      );
      console.log(newPassword);
      if (response.data.status == true) {
        console.log("edited Sucessfully");
        setIsLoading(false);
        setUserData({ ...userData, password: newPassword });
      } else {
        setErrorText(response.data.msg);
        console.log(response.data.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div id="security">
      <h6>Change Password</h6>
      <hr />
      <form onSubmit={handleSubmit(handlePasswordChange)}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your old password"
          name="currentPassword"
          {...register("currentPassword", {
            required: true,
            validate: (value) => value === userData.password,
          })}
        />
        {errors.currentPassword && (
          <p className="error-msg">This field is required</p>
        )}

        <input
          className="form-control mt-1"
          placeholder="New password"
          name="NewPassword"
          id="NewPassword"
          {...register("NewPassword", {
            required: true,
            minLength: 8,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
            onChange: (e) => setNewPassword(e.target.value),
          })}
        />
        {errors.NewPassword && (
          <p className="error-msg">
            {errors.NewPassword.type === "minLength"
              ? "Password must be 8 characters long"
              : errors.NewPassword.type === "pattern"
              ? "password must include at least one uppercase, one lowercase, one number and one special character."
              : "This field is required"}
          </p>
        )}

        <input
          type="text"
          className="form-control mt-1"
          placeholder="Confirm new password"
          name="ConfirmNewPassword"
          {...register("ConfirmNewPassword", {
            required: true,
            validate: (value) =>
              value === document.getElementById("NewPassword").value,
          })}
        />
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
}
