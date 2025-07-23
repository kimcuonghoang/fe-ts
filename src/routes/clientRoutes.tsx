import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ClientLayout from "./../layouts/clientLayout";
import Shop from "../pages/client/Shop";
import About from "../pages/client/About";

const routes = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
    ],
  },
];

const Router = createBrowserRouter(routes);

export const AppRoutes = () => {
  return <RouterProvider router={Router} />;
};
