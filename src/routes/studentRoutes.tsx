import { RouteObject } from "react-router-dom";

import ClassListPage from "../pages/student/class/ClassListPage";
import AttendancePage from "../pages/student/attendance/AttendancePage";
import StudentLayout from "../components/layouts/StudentLayout";
import ProtectedRoute from "./ProtectedRoute";
import { RoleEnum } from "../common/types";

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
        path: "attendances",
        element: <AttendancePage />,
      },
    ],
  },
];
export default studentRoutes;
