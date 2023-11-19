import styles from "./wrapper.module.css";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../navbar/Topbar";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function Wrapper({ children }) {
  const [navState, setNavState] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    return <Navigate to="/login" />;
  }
  return (
    <div style={{ display: "flex" }}>
      <Sidebar navState={navState} setNavState={setNavState} />
      <div className={styles.dashboard_wrapper_container}>
        <Topbar setNavState={setNavState} />
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
