import { useRoutes } from "react-router-dom";
import DashboardLayout from "./components/layouts/dashboardlayout";

import Home from "./pages/Home";
import DeleteCustomer from "./pages/customer/deleteCustomer";
import AddCustomer from "./pages/customer/addCustomer";
import DeletePerson from "./pages/customer/person/deletePerson";
import AddPerson from "./pages/customer/person/addPerson";
import Admin from "./pages/admin/Admin";
import EditPages from "./pages/admin/editPages";

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
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/admin/edit-pages",
          element: <EditPages />,
        },
        {
          path: "/customer/add-customer",
          element: <AddCustomer />,
        },

        {
          path: "/customer/remove-customer",
          element: <DeleteCustomer />,
        },
        {
          path: "/person/add-person",
          element: <AddPerson />,
        },
        {
          path: "/person/remove-person",
          element: <DeletePerson />,
        },
      ],
    },
  ]);
};
