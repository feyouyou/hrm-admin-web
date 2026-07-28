import React from "react";
import { useLocation, useNavigate } from "react-router";
import { GetProp, Menu, MenuProps } from "antd";
import { PermissionListResponse } from "@src/api/types";
import IconMap from "../IconMap";

type MenuItem = GetProp<MenuProps, "items">[number];

export default function SiderBar() {
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
    <Menu
      defaultSelectedKeys={[`${curNavIndex}`]}
      theme="light"
      items={navList}
    />
  );
}
