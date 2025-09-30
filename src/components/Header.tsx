import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PlusIcon, BellIcon, UserCircleIcon } from 'lucide-react';
const Header = () => {
  return <header className="bg-cyan-300 border-b-4 border-black py-3">
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
          <Link to="/dashboard/new" className="inline-flex items-center justify-center px-3 py-2 border-4 border-black text-sm font-bold rounded-none text-white bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] transition-all">
            <PlusIcon className="h-4 w-4 mr-1" />
            <span>New Entry</span>
          </Link>
          <button className="p-2 bg-pink-400 border-4 border-black rounded-none text-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all">
            <BellIcon className="h-5 w-5" />
          </button>
          <button className="p-1 bg-green-400 border-4 border-black rounded-none text-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all">
            <UserCircleIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
    </header>;
};
export default Header;