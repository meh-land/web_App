import React, { FC, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Context from "../../../Context"

const VelocityControl: FC = () => {
  const attributes = ["x", "y", "theta"];
  const {IP} = useContext(Context);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  const [params, setParams] = useState<any>({
    x: 0,
    y: 0,
    theta: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const vel_Control = () => {
    axios
      .post(`http://${IP}:8000/api/velocity_test`, {
        x: params.x,
        y: params.y,
        theta: params.theta,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-wrapper">
      <h5>Velocity Control:</h5>

      <form
        className="d-flex justify-content-between"
        onSubmit={handleSubmit(vel_Control)}
      >
        {attributes.map((attribute, index) => (
          <div className="input-group" key={index}>
            <input
              type="number"
              id={attribute}
              placeholder=""
              {...register(attribute, { onChange: handleChange })}
            />
            <label htmlFor={attribute}>{attribute}</label>
          </div>
        ))}
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default VelocityControl;
