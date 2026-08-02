import request from ".";
import {
  CreateStaffRequest,
  DestroyStaffReqeust,
  GetStaffListRepsponse,
  GetStaffListRequest,
  LoginResponse,
  PermissionListResponse,
  StaffAnalysisResponse,
  UpdateStaffReqeust,
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

/** 获取员工分析数据 */
export const GetStaffAnalysis = async () => {
  const resp = await request<StaffAnalysisResponse>({
    method: "GET",
    url: "/analyzeStaff",
  });
  return resp;
};

/** 获取员工列表 */
export const GetStaffList = async (data?: GetStaffListRequest) => {
  const resp = await request<GetStaffListRepsponse>({
    method: "POST",
    url: "/getStaff",
    data,
  });
  return resp;
};

/** 新增员工 */
export const CreateStaff = async (data: CreateStaffRequest) => {
  const resp = await request({
    method: "POST",
    url: "/createStaff",
    data,
  });
  return resp;
};

/** 更新员工 */
export const UpdateStaff = async (data: UpdateStaffReqeust) => {
  const resp = await request({
    method: "POST",
    url: "/updateStaff",
    data,
  });
  return resp;
};

/** 删除员工 */
export const DeleteStaff = async (data: DestroyStaffReqeust) => {
  const resp = await request({
    method: "DELETE",
    url: "/destroyStaff",
    data,
  });
  return resp;
};
