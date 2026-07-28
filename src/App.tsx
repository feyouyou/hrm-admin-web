import React from "react";
import "./App.scss";
import { Outlet, useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/login")}>login</button>
      <button onClick={() => navigate("/dashboard")}>dashboard</button>
      <hr />
      <Outlet />
    </div>
  );
}
