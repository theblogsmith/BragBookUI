import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
const Layout = () => {
  return <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default Layout;