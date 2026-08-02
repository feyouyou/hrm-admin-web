import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { StoreStateType } from "@src/store";
import { PermissionListResponse } from "@src/api/types";

export default function RequireAuth() {
  const location = useLocation();
  const userInfo = useSelector((state: StoreStateType) => state.userInfo);

  const permissionsList: PermissionListResponse["permissionList"] = JSON.parse(
    localStorage.getItem("permissionsList") || "[]",
  );

  if (!userInfo.account || !permissionsList.length) {
    // 未登录或无权限信息，跳转登录页
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
