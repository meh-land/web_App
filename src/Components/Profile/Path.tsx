import { FC } from "react";
import { Link } from "react-router-dom";

interface PathProps {
  path: string;
}

const Path: FC<PathProps> = ({ path }) => {
  return (
    <>
      <h3 className="">Account Settings</h3>
      <hr className="hr hr-blurry" />
    </>
  );
};

export default Path;
