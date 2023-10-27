import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Context from "../../Context";
import "./mobSidebar.css";

export default function MobSidebar() {
  const { sidebar, IsOpen } = useContext(Context);

  const handleClick = (event) => {
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
}
