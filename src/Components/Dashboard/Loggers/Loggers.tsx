import { FC, useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import Context from "../../../Context";
import axios from "axios";
import "./Loggers.css";

const Loggers: FC = () => {
  const { DASHBOARD_IP } = useContext(Context);
  const [logLines, setLogLines] = useState<string[]>([]);

  useEffect(() => {
    console.log(DASHBOARD_IP);

    const fetchData = () => {
      axios
        .get(`http://${DASHBOARD_IP}:8001/api/check-log`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          const data = response.data;

          if (data.message !== "No changes detected.") {
            setLogLines((prevLogLines) => [data.new_line, ...prevLogLines]);
            console.log(data.new_line);
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
  }, [DASHBOARD_IP]);

  return (
    <div id="Logs">
      <Card
        Title="Logs"
        Content={
          <div className="logsContent">
            {logLines.length > 0 ? (
              logLines.map((line, index) => <h5 key={index}>{line}</h5>)
            ) : (
              <h5>No logs available</h5>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Loggers;
