import React, { useState } from "react";
import Sidebar from "../Sidebar";
import FullWidthTabs from "../Tabs";
import { useEffect } from "react";

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [sidebarWidth, setSidebarWidth] = useState("100px"); // sidebar genişliğini tutan state

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarWidth("240px");
      } else {
        setSidebarWidth("256px");
      }
    };

    handleResize(); // İlk render'da kontrol etmek için çağırın

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: `0 0 ${sidebarWidth}`,
          transition: "flex 0.6s",
          overflow: "hidden", // Ekleyin
        }}
      >
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
