import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Path from "../Path/Path";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import Swal from "sweetalert2";
import axios from "axios";
import "./Robots.css";
import Loader from "../Loader/Loader";

interface Robot {
  id: number;
  name: string;
}

export default function Robots() {
  const { isChecked, userData, WEB_IP, isLoading, setIsLoading } =
    useContext(Context);
  const [robots, setRobots] = useState<Robot[]>([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://${WEB_IP}:8000/api/getRobots`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        setRobots(response.data);
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error("Failed to fetch data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const AddRobot = () => {
    Swal.fire({
      title: "Enter Robot Name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage(`Please enter a robot name.`);
          return;
        }
        return axios
          .post(
            `http://${WEB_IP}:8000/api/createRobot`,
            { name: name },
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status !== 200 && response.status !== 201) {
              throw new Error(response.statusText);
            }
            setRobots(response.data);
            console.log(response.data);
            return response.data;
          })
          .catch((error) => {
            if (error.response) {
              Swal.showValidationMessage(
                `Request failed: ${error.response.data}`
              );
            } else if (error.request) {
              Swal.showValidationMessage(`Request failed: ${error.request}`);
            } else {
              Swal.showValidationMessage(`Error: ${error.message}`);
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const DeleteRobot = (Robot_id: number) => {
    console.log(Robot_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://${WEB_IP}:8000/api/deleteRobot`, {
            params: { id: Robot_id },
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error(res.statusText);
            }
            setRobots(res.data.remainingRobots);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Deletion error:", error);
          });
      }
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="main_content dashboard_part">
      <Navbar />
      <Path title="Robots" />
      <div className="d-flex justify-content-center">
        <button className="btn-hover color-5" onClick={AddRobot}>
          + Add Robot
        </button>
      </div>
      <div className="robots-table px-5">
        <table
          className={`table table-hover ${
            isChecked ? "table-light" : "table-dark"
          }`}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Robot</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {robots.map((item, index) => (
              <tr>
                <th scope="row">{index}</th>
                <td>
                  <Link to={`/robots/${item.id}/dashboard`}>{item.name}</Link>
                </td>
                <td>
                  <i
                    className="bx bx-trash text-danger fs-4"
                    onClick={() => DeleteRobot(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
