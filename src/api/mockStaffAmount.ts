import Mock from "mockjs";
import { RespType, StaffDataResponse } from "./types";

const departmentList = ["产品部", "研发部", "运营部", "市场部", "设计部"];

// 员工信息
Mock.mock("/api/analyzeStaff", "get", (): RespType<StaffDataResponse> => {
  return {
    code: 0,
    msg: "sucess",
    data: {
      total: 26,
      onboardingTimeData: {
        one: 8,
        two: 11,
        three: 7,
      },
      genderList: [
        {
          name: "男",
          value: 15,
        },
        {
          name: "女",
          value: 11,
        },
      ],
      ageMap: {
        yData: [3, 5, 7, 6, 2, 1, 2],
        xData: ["15~20", "21~25", "26~30", "30~35", "35~40", "41~45", "46~50"],
      },
      wordingYearsMaps: new Array(10).fill(1).map(() => {
        return {
          name: Mock.mock("@cname"),
          department: departmentList[Math.floor(Math.random() * 5)],
        };
      }),
    },
  };
});
