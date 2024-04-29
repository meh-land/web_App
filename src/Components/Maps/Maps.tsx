import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Path from "../Path/Path";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import Swal from "sweetalert2";
import axios from "axios";
import "./Maps.css";
import Loader from "../Loader/Loader";

interface Map {
  id: number;
  name: string;
  file: string;
}

export default function Maps() {
  const { isChecked, userData, WEB_IP, isLoading, setIsLoading } =
    useContext(Context);
  const [maps, setMaps] = useState<Map[]>([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://${WEB_IP}:8000/api/getMaps`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        setMaps(response.data);
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

  const DeleteMap = (Map_id: number) => {
    console.log(Map_id);
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
          .delete(`http://${WEB_IP}:8000/api/deleteMap`, {
            params: { id: Map_id },
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error(res.statusText);
            }
            setMaps(res.data.remainingMaps);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
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
      <Path title="Maps" />
      <div className="d-flex justify-content-center">
        <button className="btn-hover color-5">
          <Link to="/maps/newMap">+ New Map</Link>
        </button>
      </div>
      <div className="maps-table px-5">
        <table
          className={`table table-hover ${
            isChecked ? "table-light" : "table-dark"
          }`}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Map</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {maps.map((item, index) => (
              <tr>
                <th scope="row">{index}</th>
                <td>
                  <Link to={`/maps/editMap/${item.id}`}>{item.name}</Link>
                </td>
                <td>
                  <i
                    className="bx bx-trash text-danger fs-4"
                    onClick={() => DeleteMap(item.id)}
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
