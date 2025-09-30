import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, CalendarIcon, SettingsIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { profile } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      path: '/dashboard'
    },
    {
      name: 'Timeline',
      icon: CalendarIcon,
      path: '/timeline'
    },
    {
      name: 'Settings',
      icon: SettingsIcon,
      path: '/settings'
    }
  ];

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  return <aside className="hidden md:flex md:w-64 flex-col bg-yellow-400 border-r-4 border-black">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-3 space-y-2">
          {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return <Link key={item.name} to={item.path} className={`group flex items-center px-3 py-3 text-sm font-bold rounded-none border-4 ${isActive ? 'bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]' : 'text-black border-transparent hover:bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]'}`}>
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-black' : 'text-black'}`} />
                {item.name}
              </Link>;
        })}
        </nav>
      </div>
      <div className="border-t-4 border-black p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-none bg-pink-400 border-4 border-black flex items-center justify-center text-black font-bold">
              {getInitials(profile?.full_name || null)}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-bold text-black">{profile?.full_name || 'User'}</p>
            <p className="text-xs font-bold text-black truncate">{profile?.email}</p>
          </div>
        </div>
      </div>
    </aside>;
};
export default Sidebar;