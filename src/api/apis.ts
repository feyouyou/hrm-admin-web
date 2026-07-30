import request from ".";
import {
  LoginResponse,
  PermissionListResponse,
  StaffDataResponse,
} from "./types";

/** 登录接口，同时获取用户信息 */
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

/** 获取权限列表，影响侧边栏展示 */
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

/** 获取员工相关数据统计 */
export const GetStaffData = async () => {
  const resp = await request<StaffDataResponse>({
    method: "GET",
    url: "/analyzeStaff",
  });
  return resp;
};
