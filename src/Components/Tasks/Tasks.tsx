import Navbar from "../Navbar/Navbar";
import Path from "../Path/Path";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import Swal from "sweetalert2";
import axios from "axios";
import "./Tasks.css";
import Loader from "../Loader/Loader";

interface Task {
  id: number;
  name: string;
  dropoffNode: string;
  map: string;
  pickupNode: string;
  taskTime: string;
}

interface Map {
  id: number;
  name: string;
  file: string;
}

const Tasks = () => {
  const {
    isChecked,
    userData,
    WEB_IP,
    isLoading,
    setIsLoading,
    setDashboardIP,
  } = useContext(Context);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [maps, setMaps] = useState<Map[]>([]);
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://${WEB_IP}:8000/api/getTasks`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        setTasks(response.data);
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

  const LoadMaps = () => {
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
  };

  const LoadNodes = (mapId: number) => {
    const url = `http://${WEB_IP}:8000/api/getMap/${mapId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => {
        const { nodes: fetchedNodes } = response.data;
        setNodes(fetchedNodes);
        console.log(fetchedNodes);
      })
      .catch((error) => console.error("Failed to fetch map data:", error));
  };

  const AddTask = async () => {
    await LoadMaps();
    Swal.fire({
      title: "Enter Robot Information",
      html: `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <label for="task-name">Task Name:</label>
        <input type="text" id="task-name" placeholder="Enter task name" class="swal2-input" />
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <label for="map">Choose Map:</label>
        <select id="map" class="swal2-input">
            <option value="">Select Map</option>
            ${maps
              .map((map) => `<option value="${map.id}">${map.name}</option>`)
              .join("")}
        </select>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <label for="pickup-node">Pick-Up Node:</label>
        <select id="pickup-node" class="swal2-input">
          <option value="">Select Map</option>
        ${nodes
          .map(
            (node) => `<option value="${node.id}">${node.data.label}</option>`
          )
          .join("")}
        </select>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <label for="dropoff-node">Drop-Down Node:</label>
        <select id="dropoff-node" class="swal2-input">
          <option value="">Select Map</option>
        ${nodes
          .map(
            (node) => `<option value="${node.id}">${node.data.label}</option>`
          )
          .join("")}
        </select>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <label for="robot-name">Schedule Time:</label>
        <input type="datetime-local" id="task-time" placeholder="Enter robot name" class="swal2-input" />
      </div>
          `,
      customClass: {
        popup: "swal-task-popup",
      },
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const taskName = document.getElementById(
          "task-name"
        ) as HTMLInputElement;
        const map = document.getElementById("map") as HTMLSelectElement;
        const pickUp = document.getElementById(
          "pickup-node"
        ) as HTMLSelectElement;
        const dropOff = document.getElementById(
          "dropoff-node"
        ) as HTMLSelectElement;
        const time = document.getElementById("task-time") as HTMLSelectElement;

        const TASK = taskName?.value;
        const MAP = map?.value;
        const pickUpNode = pickUp?.value;
        const dropOffNode = dropOff?.value;
        const TaskTime = time?.value;

        return axios
          .post(
            `http://${WEB_IP}:8000/api/createTask`,
            { TASK, MAP, pickUpNode, dropOffNode, TaskTime },
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
            setTasks(response.data);
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
          title: "Your robot has been created",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    const mapSelect = document.getElementById("map") as HTMLSelectElement;
    mapSelect.addEventListener("change", (event: Event) => {
      const mapId = (event.target as HTMLSelectElement).value;
      if (mapId) {
        LoadNodes(parseInt(mapId, 10));
      }
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="main_content dashboard_part">
      <Navbar />
      <Path title="Tasks" />
      <div className="d-flex justify-content-center">
        <button className="btn-hover color-5" onClick={AddTask}>
          + Add Tasks
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
              <th scope="col">Task</th>
              <th scope="col">Pick-Up Node</th>
              <th scope="col">Drop-Off Node</th>
              <th scope="col">Time</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item, index) => (
              <tr key={`task-${index}`}>
                <th scope="row">{index}</th>
                <td>{item.name}</td>
                <td>{item.pickupNode}</td>
                <td>{item.dropoffNode}</td>
                <td>{item.taskTime}</td>
                <td>
                  <i className="bx bx-trash text-danger fs-4"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
