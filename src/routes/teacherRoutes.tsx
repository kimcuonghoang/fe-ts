import { RouteObject } from "react-router-dom";

import ManagerClassPage from "../pages/teacher/manager-class/ManagerClassPage";
import ManagerSessionPage from "../pages/teacher/manager-session/ManagerSessionPage";
import TeacherLayout from "../components/layouts/TeacherLayout";
import ProtectedRoute from "./ProtectedRoute";
import { RoleEnum } from "../common/types";
import AttendanceTracking from "../pages/teacher/AttendanceTracking";
import DetailedReports from "../pages/teacher/DetailedReports";
import Dashboard from "../pages/teacher/DashBoard";

const teacherRoutes: RouteObject[] = [
  {
    path: "/teachers",
    element: (
      <ProtectedRoute allowedRoles={[RoleEnum.TEACHER]}>
        <TeacherLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "attendance/:id", element: <AttendanceTracking /> },
      { path: "reports", element: <DetailedReports /> },
      {
        path: "classes",
        element: <ManagerClassPage />,
      },
      {
        path: "sessions/:classId",
        element: <ManagerSessionPage />,
      },
    ],
  },
];
export default teacherRoutes;
