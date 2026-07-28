import React from "react";
import { Outlet } from "react-router";
import Logo from "@common/images/avatar.webp";
import "./App.scss";
import SiderBar from "./components/SiderBar";

export default function App() {
  return (
    <div className="app-container">
      <div className="left">
        <div className="logo-wrapper">
          <img src={Logo} alt="" className="logo" />
          <div className="system-name">HRM SYSTEM</div>
        </div>
        <div className="menu-list">
          <SiderBar />
        </div>
      </div>
      <div className="right">
        <div className="header">header</div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
