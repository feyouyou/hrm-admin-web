import Mock from "mockjs";
import { GetStaffListRepsponse, GetStaffListRequest, RespType } from "./types";
import { getRandom } from "@src/common/utils";
import { departmentList } from "@src/common/constants";

// 获取员工列表
Mock.mock(
  "/api/getStaff",
  "post",
  (options): RespType<GetStaffListRepsponse> => {
    const { pageSize, searchParams }: GetStaffListRequest = JSON.parse(
      options.body,
    );

    const isSearch =
      searchParams?.userName || searchParams?.level || searchParams?.department;

    return {
      code: 0,
      msg: "获取员工列表成功",
      data: {
        staffTotal: isSearch ? 5 : 100,
        staffList: new Array(isSearch ? 5 : pageSize).fill(1).map(() => {
          return {
            id: Mock.mock("@word(10)"),
            identity: getRandom(0, 2),
            level: {
              levelName: "T1‑1",
              levelDescription: searchParams?.level
                ? searchParams?.level
                : ["外包", "正式"][getRandom(0, 2)],
            },
            userName: searchParams?.userName
              ? [
                  searchParams?.userName + Mock.mock("@cname"),
                  Mock.mock("@cname") + searchParams?.userName,
                ][getRandom(0, 2)]
              : Mock.mock("@cname"),
            accountName: Mock.mock("@word"),
            department: {
              departmentName: searchParams?.department
                ? searchParams?.department
                : departmentList[Math.floor(Math.random() * 5)],
              departmentLeader: Mock.mock("@cname"),
            },
            education: getRandom(0, 6),
            gender: ["男", "女"][getRandom(0, 2)] as any,
            onboardingTime: "2021‑09‑04T02:44:48.476Z",
            idNumber: "211302196905112819",
            mobile: Mock.mock(/^1[3-9]\d{9}$/),
            salary: "10000",
            graduatedSchool: Mock.mock("@city").slice(0, 2) + "大学",
            avatar: `https://avatars.githubusercontent.com/u/${getRandom(1, 100000000)}`,
          };
        }),
      },
    };
  },
);

// 添加员工
Mock.mock("/api/createStaff", "post", (options): RespType<any> => {
  return {
    code: 0,
    msg: "添加员工成功",
    data: JSON.parse(options.body),
  };
});

// 修改员工
Mock.mock("/api/updateStaff", "post", (options): RespType<any> => {
  return {
    code: 0,
    msg: "修改员工成功",
    data: {},
  };
});

// 删除员工
Mock.mock("/api/destroyStaff", "delete", (options): RespType<any> => {
  return {
    code: 0,
    msg: "删除员工成功",
    data: {},
  };
});
