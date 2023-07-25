import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TabProvider } from "./components/provider/TabProvider"; // Import TabProvider
import { RouteList } from "./Routes";
import { SidebarProvider } from "./context/SidebarContext";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <SidebarProvider>
        <TabProvider>
          <RouteList />
        </TabProvider>
      </SidebarProvider>
    </Router>
  );
};

export default App;
