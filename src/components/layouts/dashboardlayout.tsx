import React from 'react';
import Sidebar from '../Sidebar';

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 256px' }}>
        <Sidebar />
      </div>
      <div style={{ flex: '1 0 auto', padding: '1em' }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;