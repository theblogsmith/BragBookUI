import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, PlusIcon, BellIcon, UserCircleIcon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-cyan-300 border-b-4 border-black py-3">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-yellow-400 p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
              <BookOpenIcon className="h-7 w-7 text-black" />
            </div>
            <span className="text-xl font-black text-black">BRAG BOOK</span>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/new"
            className="inline-flex items-center justify-center px-3 py-2 border-4 border-black text-sm font-bold rounded-none text-white bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] transition-all"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            <span>New Entry</span>
          </Link>
          <button className="p-2 bg-pink-400 border-4 border-black rounded-none text-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all">
            <BellIcon className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-1 bg-green-400 border-4 border-black rounded-none text-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all"
            >
              <UserCircleIcon className="h-7 w-7" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] z-50">
                <div className="p-3 border-b-4 border-black">
                  <p className="font-bold text-black">{profile?.full_name || 'User'}</p>
                  <p className="text-xs text-black">{user?.email}</p>
                </div>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold border-b-2 border-black"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-black hover:bg-pink-300 font-bold flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;