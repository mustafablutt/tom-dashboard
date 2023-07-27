import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TabProvider } from "./components/provider/TabProvider";
import { RouteList } from "./Routes";
import { SidebarProvider } from "./context/SidebarContext";
import { PageComponentProvider } from "./context/PageComponentContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const App: React.FunctionComponent = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <SidebarProvider>
          <TabProvider>
            <PageComponentProvider>
              <RouteList />
            </PageComponentProvider>
          </TabProvider>
        </SidebarProvider>
      </Router>
    </DndProvider>
  );
};

export default App;
