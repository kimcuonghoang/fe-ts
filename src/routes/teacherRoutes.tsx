import { RouteObject } from "react-router-dom";

import ManagerClassPage from "../pages/teacher/manager-class/ManagerClassPage";
import ManagerSessionPage from "../pages/teacher/manager-session/ManagerSessionPage";
import TeacherLayout from "../components/layouts/TeacherLayout";
import ProtectedRoute from "./ProtectedRoute";
import { RoleEnum } from "../common/types";
import AttendanceTracking from "../pages/teacher/AttendanceTracking";
import DetailedReports from "../pages/teacher/DetailedReports";
import Dashboard from "../pages/teacher/DashBoard";
import DetailSessionPage from "../pages/teacher/manager-session/DetailSessionPage";

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

      // Classes

      {
        path: "classes",
        element: <ManagerClassPage />,
      },
      // Session
      {
        path: "sessions/:classId",
        element: <ManagerSessionPage />,
      },
      { path: "sessions-detail/:id", element: <DetailSessionPage /> },

      // Attendance

      { path: "attendance/:sessionId", element: <AttendanceTracking /> },
      { path: "reports", element: <DetailedReports /> },
    ],
  },
];
export default teacherRoutes;
