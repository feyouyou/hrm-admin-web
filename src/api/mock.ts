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
              _id: "615d6be0f75f2f9fdc6458b9",
              icon: "Dashboard",
              text: "Dashboard",
              route: "/dashboard",
            },
            {
              _id: "615d6dcff75f2f9fdc6458c2",
              icon: "Attendance",
              text: "出勤统计",
              route: "/attendance",
            },
            {
              _id: "6161acd3f75f2f73c46a3bbe",
              icon: "Team",
              text: "员工",
              route: "/staff",
            },
            {
              _id: "6167cfb55764855210508b9d",
              icon: "Department",
              text: "部门",
              route: "/department",
            },
            {
              _id: "6167cff35764855210508b9e",
              icon: "Level",
              text: "职级",
              route: "/level",
            },
            {
              _id: "6167d14f5764855210508ba3",
              icon: "Assessment",
              text: "绩效考核",
              route: "/assessment",
            },
            {
              _id: "6167d1685764855210508bab",
              icon: "Salary",
              text: "调薪记录",
              route: "/salary",
            },
            {
              _id: "6167d1735764855210508baf",
              icon: "RewardAndPunishment",
              text: "奖惩记录",
              route: "/rewardRecord",
            },
            {
              _id: "61779993576485639835771c",
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
            _id: "615d6be0f75f2f9fdc6458b9",
            icon: "Dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            _id: "615d6dcff75f2f9fdc6458c2",
            icon: "Attendance",
            text: "出勤统计",
            route: "/attendance",
          },
        ],
      },
    };
  },
);
