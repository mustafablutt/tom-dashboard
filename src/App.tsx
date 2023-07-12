import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TabProvider } from './components/provider/TabProvider'; // Import TabProvider



import Home from './pages/Home';
import Tasks from './pages/Task';
import Chats from './pages/Chats';
import Analytics from './pages/Analytics';
import Deneme from './pages/Deneme';
import Deneme1 from './pages/Deneme1';

import DashboardLayout from './components/layouts/dashboardlayout';
import Team from './pages/Team';


const App: React.FunctionComponent = () => {
  return (
    <TabProvider> {/* Wrap your app with TabProvider */}
      <Router>
        <Routes>
          <Route path='/home' element={
            <DashboardLayout>
              
              <Home />
            </DashboardLayout>
          }/>
          <Route path='/team' element={
            <DashboardLayout>
             <Team />
            </DashboardLayout>
          }/>
          <Route path='/tasks' element={
            <DashboardLayout>
              <Tasks />
            </DashboardLayout>
          }/>
          <Route path='/chats' element={
            <DashboardLayout>
              <Chats />
            </DashboardLayout>
          }/>
          <Route path='/analytics' element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          }/>
           <Route path='/Deneme' element={
            <DashboardLayout>
              <Deneme />
            </DashboardLayout>
          }/>
           <Route path='/Deneme1' element={
            <DashboardLayout>
              <Deneme1 />
            </DashboardLayout>
          }/>
        </Routes>
      </Router> 
    </TabProvider> 
  )
}

export default App;
