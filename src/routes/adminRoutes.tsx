import { RouteObject } from "react-router-dom";
import DashBoardAdmin from "../pages/admin/DashBoardAdmin";
import ManagetUserPage from "../pages/admin/manager-user/ManagetUserPage";
import ManagerClassPage from "../pages/admin/manager-class/ManagerClassPage";
import ManagerMajorPage from "../pages/admin/manager-major/ManagerMajorPage";
import ManagerSubjectPage from "../pages/admin/manager-subject/ManagerSubjectPage";

const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <DashBoardAdmin />,
  },
  { path: "/users", element: <ManagetUserPage /> },
  { path: "/classes", element: <ManagerClassPage /> },
  { path: "/majors", element: <ManagerMajorPage /> },
  { path: "/subjects", element: <ManagerSubjectPage /> },
];
export default adminRoutes;
