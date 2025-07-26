"use client";

import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { logout } from '../../features/authSlice';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProfilePage() {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    (dispatch as any)(logout());
  };
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
        <Navbar />
        <div className="flex-1 flex items-center justify-center mt-20">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center animate-fadeIn">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Profile</h1>
            <p className="text-gray-500">You are not logged in.</p>
          </div>
        </div>
        <Footer />
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s ease both;
          }
        `}</style>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center animate-fadeIn">
          <img src={`https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=0D8ABC&color=fff&size=64`} alt="avatar" className="rounded-full w-16 h-16 border mb-4" />
          <h1 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
            <FaUser /> {user.displayName || user.email}
          </h1>
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <FaEnvelope /> {user.email}
          </div>
          <div className="mt-2 text-gray-500 text-sm">User ID: {user.uid}</div>
          {user.phoneNumber && (
            <div className="flex items-center gap-2 text-gray-700 mt-2">
              <span className="font-semibold">Phone:</span> {user.phoneNumber}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 flex items-center gap-2 transition-all duration-200"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      <Footer />
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease both;
        }
      `}</style>
    </div>
  );
}
