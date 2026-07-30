// 响应体全貌
// {
//   code: 0 | 1; // 业务码，0代表请求成功，1代表请求失败
//   msg: string; // 请求结果描述 或 错误消息
//   data: {}; // 业务数据
// }
export interface RespType<T> {
  code: 0 | 1;
  msg: string;
  data: T;
}

/** 用户登录 */
export interface LoginResponse {
  account?: string; // 账号
  username?: string; // 昵称
  id?: string; // 用户唯一标识
  identity?: 0 | 1; // 1-管理员 0-员工
  department?: string; // 用户所在部门
  avatar?: string;
}

/** 权限列表 */
export interface PermissionListResponse {
  permissionList: {
    icon: string;
    text: string;
    route: string;
  }[];
}

/** 员工信息 */
export interface StaffDataResponse {
  total: number; // 总人数
  /** 入职年限分布 */
  onboardingTimeData: {
    one: number; // 入职一年人数
    two: number; // 入职两年人数
    three: number; // 入职三年人数
  };
  // 性别分布
  genderList: {
    name: "男" | "女"; // 性别
    value: number; // 男性总数
  }[];
  /** 年龄列表 */
  ageMap: {
    xData: string[];
    yData: number[];
  };
  /** 工龄最大的10人 */
  wordingYearsMaps: {
    name: string; // 姓名
    department: string; // 部门
  }[];
}
