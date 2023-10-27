import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <header>
        <div className="image-text">
          <div className="text logo-text">
            <h3>LOGO</h3>
          </div>
        </div>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links p-0 ">
            <li>
              <a href="#">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
