import { FC, useContext, useEffect, useState } from "react";
import SpeedTimeChart from "../Chart/Chart";
import axios from "axios";
import Context from "../../../Context";

const MotorsSpeed: FC = () => {
  const { DASHBOARD_IP } = useContext(Context);
  const [Lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    console.log(DASHBOARD_IP);

    const fetchData = () => {
      axios
        .get(`http://${DASHBOARD_IP}:8001/api/velocities`)
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
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const speeds =
    Lines.length > 0 ? Lines[0].split(", ").map(Number) : [0, 0, 0, 0];

  return <SpeedTimeChart speeds={speeds} />;
};

export default MotorsSpeed;
