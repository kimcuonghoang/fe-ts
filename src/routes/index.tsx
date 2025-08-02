import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from "../pages/common/NotFoundPage";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import teacherRoutes from "./teacherRoutes";
import studentRoutes from "./studentRoutes";
import commonRoutes from "./commonRoutes";
import { RoleEnum } from "../common/types";

const getRedirectPath = (user: { role: RoleEnum } | null) => {
  if (!user) return "/";
  switch (user.role) {
    case RoleEnum.SUPER_ADMIN:
      return "/admin/users";
    case RoleEnum.TEACHER:
      return "/teacher/classes";
    case RoleEnum.STUDENT:
      return "/student/classes";
    default:
      return "/login";
  }
};
const router: RouteObject[] = [
  ...commonRoutes,
  {
    path: "/",
    element:
      // Chuyển hướng nếu đã đăng nhập, nếu không hiển thị HomePage (được bọc trong commonRoutes)
      JSON.parse(localStorage.getItem("user") || "null") && (
        <Navigate
          to={getRedirectPath(
            JSON.parse(localStorage.getItem("user") || "null")
          )}
          replace
        />
      ),
  },
  ...adminRoutes,
  ...authRoutes,
  ...teacherRoutes,
  ...studentRoutes,
  { path: "*", element: <NotFoundPage /> },
];

const Routes = createBrowserRouter(router);
export const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  );
};
