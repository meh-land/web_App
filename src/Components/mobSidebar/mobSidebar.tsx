import { Link } from "react-router-dom";
import { FC, useContext, useState } from "react";
import Context from "../../Context";
import "./mobSidebar.css";

const MobSidebar: FC = () => {
  const { sidebar, IsOpen } = useContext(Context);

  const handleClick = () => {
    IsOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={"metaportal_fn_leftnav_closer" + (sidebar ? " active" : "")}
      />
      <div className={"metaportal_fn_leftnav" + (sidebar ? " active" : "")}>
        <Link to="/" className="fn__closer" onClick={handleClick}>
          <span />
        </Link>
      </div>
    </>
  );
};

export default MobSidebar;
