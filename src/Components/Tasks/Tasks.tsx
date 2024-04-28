import { Link } from "react-router-dom";
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

  return isLoading ? (
    <Loader />
  ) : (
    <div className="main_content dashboard_part">
      <Navbar />
      <Path title="Tasks" />
      <div className="d-flex justify-content-center">
        <button className="btn-hover color-5">+ Add Tasks</button>
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{/* Tasks to be added */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
