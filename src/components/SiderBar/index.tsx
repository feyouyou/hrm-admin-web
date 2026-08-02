import React from "react";
import { useLocation, useNavigate } from "react-router";
import { GetProp, Layout, Menu, MenuProps } from "antd";
import { PermissionListResponse } from "@src/api/types";
import Logo from "@common/images/avatar.webp";
import IconMap from "../IconMap";
import "./index.scss";

const { Sider } = Layout;

type MenuItem = GetProp<MenuProps, "items">[number];

interface SiderBarProps {
  collapsed: boolean;
}

export default function SiderBar(props: SiderBarProps) {
  const { collapsed } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const permissionsList: PermissionListResponse["permissionList"] = JSON.parse(
    localStorage.getItem("permissionsList") || "[]",
  );

  const navList: MenuItem[] = permissionsList.map((item, index) => {
    return {
      key: `${index}`,
      icon: (IconMap as any)[item.icon],
      label: item.text,
      onClick() {
        navigate(item.route);
      },
    };
  });

  const curNavIndex = permissionsList.findIndex((item) => {
    return item.route === location.pathname;
  });

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
      style={{ borderRight: "1px solid #eee" }}
    >
      <div className="logo-wrapper">
        <img src={Logo} alt="" className="logo" />
        {!collapsed && <div className="system-name">HRM SYSTEM</div>}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[`${curNavIndex}`]}
        items={navList}
        style={{ border: 0 }}
      />
    </Sider>
  );
}
