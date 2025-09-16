import { RouteObject } from "react-router-dom";

import ClassListPage from "../pages/student/class/ClassListPage";
import AttendancePage from "../pages/student/attendance/AttendancePage";
import StudentLayout from "../components/layouts/StudentLayout";
import ProtectedRoute from "./ProtectedRoute";
import { RoleEnum } from "../common/types";
import ClassSchedulePage from "../pages/student/class/ClassSchedulePage";
import AttendanceSchedulePage from "../pages/student/attendance/AttendanceSchedule";

const studentRoutes: RouteObject[] = [
  {
    path: "/students",
    element: (
      <ProtectedRoute allowedRoles={[RoleEnum.STUDENT]}>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "classes",
        element: <ClassListPage />,
      },
      {
        path: "classes/schedule/:classId",
        element: <ClassSchedulePage />,
      },
      {
        path: "attendances",
        element: <AttendancePage />,
      },
      {
        path: "attendances/:classId",
        element: <AttendanceSchedulePage />,
      },
    ],
  },
];
export default studentRoutes;
