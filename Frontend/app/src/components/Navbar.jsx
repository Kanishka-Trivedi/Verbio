import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useLocation } from 'react-router-dom';
import { BellIcon, LogOutIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import ThemeSelector from './ThemeSelector.jsx';
import useLogout from '../hooks/useLogout.js';

function Navbar() {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <img src="/Logo.png" className='h-[85px]' alt="Logo" />
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <Link to="/profile" className="avatar">
            <div className="w-7 mx-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 transition">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </Link>


          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
