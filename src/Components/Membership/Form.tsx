import { FC } from "react";

interface FormProps {
  data: JSX.Element;
  action: string;
}

const Form: FC<FormProps> = ({ data, action }) => {
  return <form className={`form-group form-group--${action}`}>{data}</form>;
};
export default Form;
