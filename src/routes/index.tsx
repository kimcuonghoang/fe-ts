import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "../pages/common/NotFoundPage";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import teacherRoutes from "./teacherRoutes";
import studentRoutes from "./studentRoutes";
import commonRoutes from "./commonRoutes";

const router = [
  ...commonRoutes,
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
