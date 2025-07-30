import { RouteObject } from "react-router-dom";

import CommonLayout from "../components/layouts/CommonLayout";
import HomePage from "../pages/common/HomePage";
import PrivacyPage from "../pages/common/PrivacyPage";
import TemsPage from "../pages/common/TemsPage";
import AboutPage from "../pages/common/AboutPage";
import ContactPage from "../pages/common/ContactPage";
import CoursesPage from "../pages/common/CoursesPage";

const commonRoutes: RouteObject[] = [
  {
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
      {
        path: "/tems",
        element: <TemsPage />,
      },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
];
export default commonRoutes;
