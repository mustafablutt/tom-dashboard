import { useRoutes } from "react-router-dom";
import DashboardLayout from "./components/layouts/dashboardlayout";

import Home from "./pages/Home";
import Tasks from "./pages/Task";
import Chats from "./pages/Chats";
import Analytics from "./pages/Analytics";
import Root10 from "./pages/Root10";
import Random from "./pages/Random";
import Team from "./pages/Team";
import Random2 from "./pages/Random2";
import Random3 from "./pages/Random3";

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
          path: "/Random",
          element: <Random />,
        },
        {
          path: "/Root10",
          element: <Root10 />,
        },
        {
          path: "/Random2",
          element: <Random2 />,
        },
        {
          path: "/Random3",
          element: <Random3 />,
        },
      ],
    },
  ]);
};
