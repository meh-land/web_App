import { FC, useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Status.css";
import axios from "axios";
import Context from "../../../Context";

const Status: FC = () => {
  const { DASHBOARD_IP } = useContext(Context);
  const [Lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    console.log(DASHBOARD_IP);

    const fetchData = () => {
      axios
        .get(`http://${DASHBOARD_IP}:8001/api/status`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          const data = response.data;

          if (
            data.message !== "No changes detected." &&
            !(data.new_line === Lines[0])
          ) {
            setLines((prevLines) => [data.new_line, ...prevLines]);
            console.log(data.new_line);
            console.log(!(data.new_line === Lines[0]));
          }
        })
        .catch(function (error) {
          console.error("Failed to fetch data:", error);
        });
    };

    // Fetch data immediately on component mount
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      Title="Status"
      Content={
        <div className="table-responsive status">
          <table className="table table-borderless mb-0 table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">X</th>
                <th scope="col">Y</th>
                <th scope="col">θ</th>
              </tr>
            </thead>
            <tbody>
              {Lines.length > 0 ? (
                Lines.map((line, index) => {
                  if (line) {
                    const parts = line.split(", ");
                    if (parts.length === 3) {
                      const [x, y, theta] = parts;
                      return (
                        <tr key={index}>
                          <td>{x}</td>
                          <td>{y}</td>
                          <td>{theta}</td>
                        </tr>
                      );
                    }
                  }
                  return null;
                })
              ) : (
                <tr>
                  <td colSpan={3}>No Status Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    />
  );
};

export default Status;
