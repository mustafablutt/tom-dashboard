// App.tsx

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'

import Home from './pages/Home';

import Tasks from './pages/Task';
import Chats from './pages/Chats';
import Analytics from './pages/Analytics';

import DashboardLayout from './components/layouts/dashboardlayout';
import FullWidthTabs from './components/Tabs'; // Tabs bileşenini ekledik

const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <DashboardLayout>
              <FullWidthTabs /> {/* Tabs bileşenini ekledik */}
              <Home />
            </DashboardLayout>
          }/>
          <Route path='/team' element={
            <DashboardLayout>
            
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
        </Routes>
      </Router> 
    </>
  )
}

export default App;
