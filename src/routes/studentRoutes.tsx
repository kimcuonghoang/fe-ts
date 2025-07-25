import { RouteObject } from "react-router-dom";

import ClassListPage from "../pages/student/class/ClassListPage";
import AttendancePage from "../pages/student/attendance/AttendancePage";

const studentRoutes: RouteObject[] = [
  {
    path: "/classes",
    element: <ClassListPage />,
  },
  {
    path: "/attendances",
    element: <AttendancePage />,
  },
];
export default studentRoutes;
