import { createBrowserRouter, createHashRouter, Navigate } from "react-router";
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
import AuthGuard from "@src/components/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/attendance", element: <Attendance /> },
          { path: "/staff", element: <Staff /> },
          { path: "/department", element: <Department /> },
          { path: "/level", element: <Level /> },
          { path: "/assessment", element: <Assessment /> },
          { path: "/salary", element: <Salary /> },
          { path: "/rewardRecord", element: <RewardRecord /> },
          { path: "/attendanceInfo", element: <AttendanceInfo /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default router;
