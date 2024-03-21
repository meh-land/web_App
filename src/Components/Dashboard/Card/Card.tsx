import { FC, ReactNode } from "react";
import "./Card.css";
import Stop from "../Control_Panel/StopMotion";

interface Props {
  Title: string;
  Content: ReactNode;
}
const Card: FC<Props> = ({ Title, Content }) => {
  return (
    <div className="card control-panel">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0 text-capitalize">{Title}</h5>
        {Title === "Control Panel:" ? <Stop /> : ""}
      </div>
      <div className="card-body">{Content}</div>
    </div>
  );
};
export default Card;
