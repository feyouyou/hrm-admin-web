import Mock from "mockjs";
import { LoginResponse, PermissionListResponse, RespType } from "./types";

// 用户登录
Mock.mock("/api/login", "post", (options): RespType<LoginResponse> => {
  const data = JSON.parse(options.body);
  if (data.account === "admin" && data.password === "123123") {
    return {
      code: 0,
      msg: "sucess",
      data: {
        account: "admin", // 账号
        username: "管理员", // 昵称
        id: "238hed8h84d", // 用户唯一标识
        identity: 1, // 0-员工 1-管理员
        department: "行政", // 用户所在部门
        avatar: "https://avatars.githubusercontent.com/u/67512293",
      },
    };
  }
  if (data.account === "xiaoming" && data.password === "123123") {
    return {
      code: 0,
      msg: "sucess",
      data: {
        account: "xiaoming", // 账号
        username: "小明", // 昵称
        id: "kdjf3i3ff", // 用户唯一标识
        identity: 0, // 0-员工 1-管理员
        department: "IT", // 用户所在部门
        avatar: "https://avatars.githubusercontent.com/u/67512294",
      },
    };
  }
  return {
    code: 1,
    msg: "账号或密码错误",
    data: {},
  };
});

// 权限列表
Mock.mock(
  /^\/api\/permissionList/,
  "get",
  (options): RespType<PermissionListResponse> => {
    const urlObj = new URL(options.url, window.location.origin);
    const identity = urlObj.searchParams.get("identity");

    // 管理员
    if (String(identity) === "1") {
      return {
        code: 0,
        msg: "success",
        data: {
          permissionList: [
            {
              icon: "Dashboard",
              text: "Dashboard",
              route: "/dashboard",
            },
            {
              icon: "Attendance",
              text: "出勤统计",
              route: "/attendance",
            },
            {
              icon: "Team",
              text: "员工",
              route: "/staff",
            },
            {
              icon: "Department",
              text: "部门",
              route: "/department",
            },
            {
              icon: "Level",
              text: "职级",
              route: "/level",
            },
            {
              icon: "Assessment",
              text: "绩效考核",
              route: "/assessment",
            },
            {
              icon: "Salary",
              text: "调薪记录",
              route: "/salary",
            },
            {
              icon: "RewardAndPunishment",
              text: "奖惩记录",
              route: "/rewardRecord",
            },
            {
              icon: "BarChart",
              text: "考勤信息",
              route: "/attendanceInfo",
            },
          ],
        },
      };
    }
    // 员工
    return {
      code: 0,
      msg: "success",
      data: {
        permissionList: [
          {
            icon: "Dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: "Attendance",
            text: "出勤统计",
            route: "/attendance",
          },
        ],
      },
    };
  },
);
