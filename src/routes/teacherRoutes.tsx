import { RouteObject } from "react-router-dom";

import ManagerClassPage from "../pages/teacher/manager-class/ManagerClassPage";
import ManagerSessionPage from "../pages/teacher/manager-session/ManagerSessionPage";
import TeacherLayout from "../components/layouts/TeacherLayout";
import ProtectedRoute from "./ProtectedRoute";
import { RoleEnum } from "../common/types";

const teacherRoutes: RouteObject[] = [
  {
    path: "/teachers",
    element: (
      <ProtectedRoute allowedRoles={[RoleEnum.TEACHER]}>
        <TeacherLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "classes",
        element: <ManagerClassPage />,
      },
      {
        path: "sessions",
        element: <ManagerSessionPage />,
      },
    ],
  },
];
export default teacherRoutes;
