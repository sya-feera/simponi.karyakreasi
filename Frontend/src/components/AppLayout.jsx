// src/components/AppLayout.jsx
import React, { useState } from 'react';
import Sidebar from './sidebar';

const AppLayout = ({ children, currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-layout" style={{ display: 'flex' }}>
      <Sidebar
        currentPage={currentPage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main
        style={{
          marginLeft: isSidebarOpen ? '250px' : '70px',
          padding: '20px',
          width: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 70px)',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;