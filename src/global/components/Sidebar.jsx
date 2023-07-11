import { BsFillHouseCheckFill, BsClipboardData } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { DataTable, Overview } from "../../constants";
import { useState } from "react";

export default function Sidebar({ username }) {
  const [user, setUser] = useState(username || "user");

  return (
    <nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto min-vh-100 bg-dark d-flex flex-column  justify-content-between">
            <div className="d-flex flex-column">
              <Link to={Overview} className="btn-link">
                <div className={`nav-link py-4 button-icon `}>
                  <hr style={{ color: "white" }} className="mb-4" />
                  <BsFillHouseCheckFill />
                  <span className="button-tooltip">Home</span>
                </div>
              </Link>
              <hr style={{ color: "white" }} />
              <Link to={DataTable} className="btn-link">
                <div className="nav-link py-4 button-icon">
                  <BsClipboardData />
                  <span className="button-tooltip">Data Management</span>
                </div>
              </Link>
              <hr style={{ color: "white" }} />
            </div>

            <div className="nav-link py-4 button-icon">
              <hr style={{ color: "white" }} />
              <BiUserCircle />
              <span className="button-tooltip">{user}</span>
              <hr style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
