import { FC } from "react";
import ControlPanel from "./Control_Panel/Control_Panel";
import LiveLocation from "./Live_Location/LiveLocation";
import MotorsSpeed from "./Motors_Speed/MotorsSpeed";
import Status from "./Status/Status";
import Loggers from "./Loggers/Loggers";
import Header from "./Header/Header";

const Dashboard: FC = () => {
  return (
    <>
      <Header />
      <div className="mx-4">
        <div className="row">
          <div className="col-lg-8 col-sm-12 order-sm-2 order-lg-1">
            <LiveLocation />
            <MotorsSpeed />
          </div>
          <div className="col-lg-4 col-sm-12 order-sm-1 order-lg-2">
            <ControlPanel />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <Status />
          </div>
          <div className="col-lg-7">
            <Loggers />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
