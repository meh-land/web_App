import { FC, ReactNode } from "react";
import "./Card.css";

interface Props {
  Title: string;
  Content: ReactNode;
}
const Card: FC<Props> = ({ Title, Content }) => {
  return (
    <div className="card control-panel">
      <div className="card-header">
        <h4 className="mb-0 text-capitalize">{Title}</h4>
      </div>
      <div className="card-body">{Content}</div>
    </div>
  );
};
export default Card;
