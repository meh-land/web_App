import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./Profile.css";
import Context from "../../Context";
import axios from "axios";
import Swal from "sweetalert2";

interface FormData {
  fullName: string;
  email: string;
}
const EditProfile: FC = () => {
  const { userData, setUserData, setIsLoading } = useContext(Context);
  const [errortext, setErrorText] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const handleEditPress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://127.0.0.1/apicrud/editusers.php",
        {
          fullname: userData.name,
          email: userData.email,
          user_id: userData.user_id,
        }
      );

      if (response.data.status === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setErrorText(response.data.msg);
        console.log(response.data.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="profile">
      <h6>YOUR PROFILE INFORMATION</h6>
      <hr />
      <form onSubmit={handleSubmit(handleEditPress)}>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          placeholder="Enter your fullname"
          value={userData.name}
          onChange={(e) =>
            setUserData({
              ...userData,
              name: e.target.value,
            })
          }
        />
        <label htmlFor="fullName">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          id="email"
          value={userData.email}
          onChange={(e) =>
            setUserData({
              ...userData,
              email: e.target.value,
            })
          }
        />
        <hr />
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
        <button type="reset" className="btn btn-light" onClick={() => reset()}>
          Reset Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
