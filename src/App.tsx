import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TabProvider } from "./components/provider/TabProvider"; // Import TabProvider
import { RouteList } from "./Routes";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <TabProvider>
        <RouteList />
      </TabProvider>
    </Router>
  );
};

export default App;
