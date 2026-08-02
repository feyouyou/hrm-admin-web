import { createBrowserRouter, createHashRouter, Navigate } from "react-router";
import App from "@src/App";
import Dashboard from "@src/pages/Dashboard";
import Attendance from "@src/pages/Attendance";
import Staff from "@src/pages/Staff";
import Department from "@src/pages/Department";
import Level from "@src/pages/Level";
import Assessment from "@src/pages/Assessment";
import Salary from "@src/pages/Salary";
import RewardRecord from "@src/pages/RewardRecord";
import AttendanceInfo from "@src/pages/AttendanceInfo";
import Login from "@src/pages/Login";
import NotFound from "@src/pages/NotFound";
import AuthGuard from "@src/components/AuthGuard";

export const routeList: any = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "dashboard",
    icon: "Dashboard",
  },
  // {
  //   path: "/attendance",
  //   element: <Attendance />,
  //   label: "出勤统计",
  //   icon: "Attendance",
  // },
  { path: "/staff", element: <Staff />, label: "员工管理", icon: "Team" },
  // {
  //   path: "/department",
  //   element: <Department />,
  //   label: "部门管理",
  //   icon: "Department",
  // },
  // { path: "/level", element: <Level />, label: "职级管理", icon: "Level" },
  // {
  //   path: "/assessment",
  //   element: <Assessment />,
  //   label: "绩效考核",
  //   icon: "Assessment",
  // },
  // { path: "/salary", element: <Salary />, label: "调薪记录", icon: "Salary" },
  // {
  //   path: "/rewardRecord",
  //   element: <RewardRecord />,
  //   label: "奖惩记录",
  //   icon: "RewardAndPunishment",
  // },
  // {
  //   path: "/attendanceInfo",
  //   element: <AttendanceInfo />,
  //   label: "考勤信息",
  //   icon: "BarChart",
  // },
];

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          ...routeList,
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default router;
