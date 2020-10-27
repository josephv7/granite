import React from "react";
import { Link, useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  const UserLogout = () => {
    localStorage.removeItem("authToken");
    history.push("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Granite
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active mx-1">
            <Link to="/dashboard">Home</Link>
          </li>
          <li className="nav-item active mx-1">
            <Link to="/create">Create Task</Link>
          </li>
        </ul>
        <button className="btn btn-link my-2 my-sm-0" onClick={UserLogout}>
          LogOut
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
