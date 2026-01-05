import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useLocation } from 'react-router-dom';
import { BellIcon, LogOutIcon, X, AlertCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import ThemeSelector from './ThemeSelector.jsx';
import useLogout from '../hooks/useLogout.js';

function Navbar() {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation, isLoading } = useLogout();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    logoutMutation();
    setShowLogoutModal(false);
  };

  return (
    <>
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

            <ThemeSelector />

            <Link to="/profile" className="avatar">
              <div className="w-7 mx-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 transition">
                <img src={authUser?.profilePic || "/i.png"} alt="User Avatar" />
              </div>
            </Link>

            {/* Logout button triggers modal */}
            <button 
              className="btn btn-ghost btn-circle" 
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </nav>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          ></div>

          <div className="relative bg-base-100 border border-base-300 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-4 top-4 text-base-content/50 hover:text-base-content"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-red-50 p-3 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-base-content font-sans">Are you sure?</h3>
              <p className="text-base-content/60 mb-6 text-sm">
                You are about to log out of Verbio.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="btn btn-ghost flex-1 border border-base-300"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                {/* CHANGE THE SHADE HERE:
                   bg-red-600 is a standard professional red.
                   hover:bg-red-700 makes it slightly darker on hover.
                */}
                <button
                  onClick={confirmLogout}
                  className={`btn flex-1 border-none bg-red-500 hover:bg-red-600 text-white font-medium ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? "Logging out..." : "Yes, Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;