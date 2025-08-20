import { RouteObject } from "react-router-dom";

import ManagerUserPage from "../pages/admin/manager-user/ManagerUserPage";
import ManagerClassPage from "../pages/admin/manager-class/ManagerClassPage";
import ManagerMajorPage from "../pages/admin/manager-major/ManagerMajorPage";
import ManagerSubjectPage from "../pages/admin/manager-subject/ManagerSubjectPage";
import ProtectedRoute from "./ProtectedRoute";
import { RoleEnum } from "../common/types";
import AdminLayout from "../components/layouts/AdminLayout";
import ClassFormPage from "../pages/admin/manager-class/ClassFormPage";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={[RoleEnum.SUPER_ADMIN]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "users", element: <ManagerUserPage /> },

      //Manager Class
      { path: "classes", element: <ManagerClassPage /> },
      { path: "classes/add", element: <ClassFormPage mode="add" /> },
      { path: "classes/edit/:id", element: <ClassFormPage mode="edit" /> },

      { path: "majors", element: <ManagerMajorPage /> },
      { path: "subjects", element: <ManagerSubjectPage /> },
    ],
  },
];
export default adminRoutes;
