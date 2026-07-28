import Mock from "mockjs";

Mock.mock("/api/login", "post", {
  code: 0,
  msg: "登录成功",
  data: {
    account: "admin", // 账号
    username: "管理员", // 昵称
    id: "238hed8h84d", // 用户唯一标识
    identity: 1, // 1-管理员 0-员工
    department: "行政", // 用户所在部门
  },
});
