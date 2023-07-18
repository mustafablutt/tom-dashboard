import { useRoutes } from "react-router-dom";
import DashboardLayout from "./components/layouts/dashboardlayout";

import Home from "./pages/Home";
import Tasks from "./pages/Task";
import Chats from "./pages/Chats";
import Analytics from "./pages/Analytics";
import Deneme from "./pages/Deneme";
import Deneme1 from "./pages/Deneme1";
import Team from "./pages/Team";

export const RouteList: React.FC = () => {
  return useRoutes([
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/team",
          element: <Team />,
        },
        {
          path: "/tasks",
          element: <Tasks />,
        },
        {
          path: "/chats",
          element: <Chats />,
        },
        {
          path: "/analytics",
          element: <Analytics />,
        },
        {
          path: "/deneme",
          element: <Deneme />,
        },
        {
          path: "/deneme1",
          element: <Deneme1 />,
        },
      ],
    },
  ]);
};
