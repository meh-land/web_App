import Navbar from "../Navbar/Navbar";
import Path from "../Path/Path";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import Swal from "sweetalert2";
import axios from "axios";
import "./Tasks.css";
import Loader from "../Loader/Loader";
import { Modal, Button } from "react-bootstrap";

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

interface Node {
  id: number;
  data: { label: string };
}

const Tasks = () => {
  const { isChecked, userData, WEB_IP, isLoading, setIsLoading } =
    useContext(Context);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [maps, setMaps] = useState<Map[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [mapId, setMapId] = useState<number | null>(null);
  const [pickUpNode, setPickupNode] = useState<string | null>(null);
  const [dropOffNode, setDropOffNode] = useState<string | null>(null);
  const [taskTime, setTaskTime] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        handleShow();
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
        setMapId(mapId);
        setPickupNode(null); // Reset pick up node selection
        setDropOffNode(null); // Reset drop off node selection
      })
      .catch((error) => console.error("Failed to fetch map data:", error));
  };

  const handleCreateTask = async () => {
    return axios
      .post(
        `http://${WEB_IP}:8000/api/createTask`,
        {
          TASK: taskName,
          MAP: mapId,
          pickUpNode: pickUpNode,
          dropOffNode: dropOffNode,
          TaskTime: taskTime,
        },
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
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Your task has been created",
          showConfirmButton: false,
          timer: 1500,
        });
        return response.data;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Task creation failed",
          text: error.response
            ? `Request failed: ${error.response.data}`
            : error.request
            ? `Request failed: ${error.request}`
            : `Error: ${error.message}`,
        });
      });
  };

  const DeleteTask = (task_id: number) => {
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
          .delete(`http://${WEB_IP}:8000/api/deleteTask`, {
            params: { id: task_id },
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error(res.statusText);
            }
            setTasks(res.data.remainingTasks);
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Deletion error:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the task.",
              icon: "error",
            });
          });
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
        <button className="btn-hover color-5" onClick={LoadMaps}>
          + Add Tasks
        </button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Enter Task Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="task-name">Task Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="task-name"
                  placeholder="Enter task name"
                  className="form-control"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="map">Choose Map:</label>
              </div>
              <div className="col-9">
                <select
                  id="map"
                  className="form-control"
                  value={mapId ?? ""}
                  onChange={(e) => LoadNodes(parseInt(e.target.value, 10))}
                >
                  <option value="" disabled selected>
                    Select Map
                  </option>
                  {maps.map((map) => (
                    <option value={map.id}>{map.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="pickup-node">Pick-Up Node:</label>
              </div>
              <div className="col-9">
                <select
                  id="pickup-node"
                  className="form-control"
                  value={pickUpNode ?? ""}
                  onChange={(e) => setPickupNode(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Pick-Up Node
                  </option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.data.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="dropoff-node">Drop-Off Node:</label>
              </div>
              <div className="col-9">
                <select
                  id="dropoff-node"
                  className="form-control"
                  value={dropOffNode ?? ""}
                  onChange={(e) => setDropOffNode(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Drop-Off Node
                  </option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.data.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="task-time">Schedule Time:</label>
              </div>
              <div className="col-9">
                <input
                  type="datetime-local"
                  id="task-time"
                  className="form-control"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateTask}>
              Save Task
            </Button>
          </Modal.Footer>
        </Modal>
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
              <th scope="col">Map</th>
              <th scope="col">Pick-Up Node</th>
              <th scope="col">Drop-Off Node</th>
              <th scope="col">Time</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item, index) => (
              <tr key={`task-${index}`}>
                <td scope="row">{index}</td>
                <td>{item.name}</td>
                <td>{item.map}</td>
                <td>{item.pickupNode}</td>
                <td>{item.dropoffNode}</td>
                <td>{item.taskTime}</td>
                <td>
                  <i
                    className="bx bx-trash text-danger fs-4"
                    onClick={() => DeleteTask(item.id)}
                  ></i>
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
