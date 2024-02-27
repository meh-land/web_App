import React, { FC, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Context from "../../../Context"

const PIDControl: FC = () => {
  const attributes = ["kp", "ki", "kd"];
    const {IP} = useContext(Context);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  const [params, setParams] = useState<any>({
    kp: 0,
    ki: 0,
    kd: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const PID_Control = () => {
    axios
      .post(`http://${IP}:8000/api/PID_test`, {
        kp: params.kp,
        ki: params.ki,
        kd: params.kd,
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
      <h5>PID Control:</h5>

      <form
        className="d-flex justify-content-between"
        onSubmit={handleSubmit(PID_Control)}
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

export default PIDControl;
