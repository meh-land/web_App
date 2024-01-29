import { useForm } from "react-hook-form";
import { FC, useContext, useState } from "react";
import Context from "../../Context";
import Swal from "sweetalert2";
import "./Profile.css";
import axios from "axios";

interface FormData {
  currentPassword: string;
}

const DeleteProfile: FC = () => {
  const showSwal = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        Delete();
      }
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const [PasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const { userData, isLoading, setIsLoading, logged_in, setLoggedIn } =
    useContext(Context);

  const [errortext, setErrorText] = useState<string>("");

  const Delete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete("http://127.0.0.1:8000/api/delete", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      if (response.data.status === true) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then((result: { isConfirmed: boolean }) => {
          if (result.isConfirmed) {
            window.location.href = "/Membership";
            setIsLoading(false);
          }
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
  };

  const handleToggle = (field: string) => {
    setPasswordVisible(!PasswordVisible);
  };

  return (
    <div id="account">
      <h6>DELETE ACCOUNT</h6>
      <hr />
      <form onSubmit={handleSubmit(showSwal)}>
        <div className="form-group">
          <label className="d-block text-danger">
            Are you sure you want to delete your account?
          </label>
          <p className="text-muted font-size-sm">
            This action is irreversible and will result in the permanent loss of
            all your data, including:
            <ul>
              <li>Your profile information</li>
              <li>Created Maps</li>
              <li>Created Tasks</li>
            </ul>
          </p>
        </div>
        <div className="form-group">
          <label className="d-block text-danger">
            Please consider the following before proceeding:
          </label>
          <p className="text-muted font-size-sm">
            <ol>
              <li>
                Data Loss: You will lose access to all your data associated with
                this account, and we won't be able to recover it.
              </li>
              <li>
                Re-registration: If you change your mind later, you will need to
                create a new account from scratch, and any content or actions
                cannot be restored.
              </li>
            </ol>
          </p>
        </div>
        <hr />

        <div className="d-flex justify-content-center align-items-center form-control mt-3">
          <input
            type={PasswordVisible ? "text" : "password"}
            className="form-control border-0"
            placeholder="Enter your password"
            {...register("currentPassword", {
              required: true,
              validate: (value) => value === userData.password,
            })}
          />
          {errors.currentPassword && (
            <p className="error-msg">This field is required</p>
          )}
          <i
            onClick={() => handleToggle("NewPassword")}
            className={`bx bxs-${PasswordVisible ? "show" : "hide"} fs-3`}
          ></i>
        </div>

        <hr />
        <button className="btn btn-danger" type="submit">
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteProfile;
