import { FC } from "react";
import "./Input_Field.css";

interface Props {
  id: string;
}

const Input: FC<Props> = ({ id }) => {
  return (
    <div className="input-group">
      <input type="number" id={id} placeholder="" />
      <label htmlFor={id}>{id}</label>
    </div>
  );
};

export default Input;
