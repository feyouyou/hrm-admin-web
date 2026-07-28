import { createBrowserRouter, createHashRouter } from "react-router";
import App from "@src/App";
import Dashboard from "@src/pages/Dashboard";
import Assessment from "@src/pages/Assessment";
import Attendance from "@src/pages/Attendance";
import AttendanceInfo from "@src/pages/AttendanceInfo";
import Department from "@src/pages/Department";
import Level from "@src/pages/Level";
import Login from "@src/pages/Login";
import RewardRecord from "@src/pages/RewardRecord";
import Salary from "@src/pages/Salary";
import Staff from "@src/pages/Staff";
import NotFound from "@src/pages/NotFound";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/assessment",
        element: <Assessment />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
      {
        path: "/attendanceInfo",
        element: <AttendanceInfo />,
      },
      {
        path: "/department",
        element: <Department />,
      },
      {
        path: "/level",
        element: <Level />,
      },
      {
        path: "/reward-record",
        element: <RewardRecord />,
      },
      {
        path: "/salary",
        element: <Salary />,
      },
      {
        path: "/staff",
        element: <Staff />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
