import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../navbar/Topbar";
import { Navigate } from "react-router-dom";

function Wrapper({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    return <Navigate to="/login" />;
  }
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginLeft: "300px",
        }}
      >
        <Topbar />
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
