import { useRoutes } from "react-router-dom";
import DashboardLayout from "./components/layouts/dashboardlayout";

import Home from "./pages/Home";
import DeleteCustomer from "./pages/customer/deleteCustomer";
import AddCustomer from "./pages/customer/addCustomer";
import DeletePerson from "./pages/customer/person/deletePerson";
import AddPerson from "./pages/customer/person/addPerson";

import ComponentOperations from "./pages/admin/ComponentOperations";
import PageOperations from "./pages/admin/PageOperations";
import IncomeStatement from "./pages/customer/financialreporting/incomeStatement";
import BalanceSheet from "./pages/customer/financialreporting/balanceSheet";
import CashFlowStatement from "./pages/customer/financialreporting/cashFlowStatement";
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
          path: "/admin/component-operations",
          element: <ComponentOperations />,
        },
        {
          path: "/admin/page-operations",
          element: <PageOperations />,
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
        {
          path: "/financialReporting/income-statement",
          element: <IncomeStatement />,
        },
        {
          path: "/financialReporting/balance-sheet",
          element: <BalanceSheet />,
        },
        {
          path: "/financialReporting/cash-flow-statement",
          element: <CashFlowStatement />,
        },
      ],
    },
  ]);
};
