import { RouteObject } from "react-router-dom";

import ManagerClassPage from "../pages/teacher/manager-class/ManagerClassPage";
import ManagerSessionPage from "../pages/teacher/manager-session/ManagerSessionPage";

const teacherRoutes: RouteObject[] = [
  {
    path: "/classes",
    element: <ManagerClassPage />,
  },
  {
    path: "/sessions",
    element: <ManagerSessionPage />,
  },
];
export default teacherRoutes;
