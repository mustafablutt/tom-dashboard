import React, { useState } from "react";
import Sidebar from "../Sidebar";
import FullWidthTabs from "../Tabs";

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [sidebarWidth, setSidebarWidth] = useState("100px"); // sidebar genişliğini tutan state

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: `0 0 ${sidebarWidth}`, transition: "flex 0.6s" }}>
        <Sidebar onWidthChange={setSidebarWidth} />
      </div>
      <div style={{ flex: "1 0 auto", padding: "1em" }}>
        <FullWidthTabs />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
