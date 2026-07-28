import request from ".";
import { LoginResponse, PermissionListResponse } from "./types";

export const Login = async (account: string, password: string) => {
  const resp = await request<LoginResponse>({
    method: "POST",
    url: "/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      account,
      password,
    },
  });
  return resp;
};

export const GetPermissionList = async (identity: 0 | 1) => {
  const resp = await request<PermissionListResponse>({
    method: "GET",
    url: "/permissionList",
    params: {
      identity,
    },
  });
  return resp;
};
