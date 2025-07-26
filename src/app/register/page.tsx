"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/authSlice";
import {
  FaGoogle,
  FaFacebookF,
  FaLock,
  FaEnvelope,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socialMsg, setSocialMsg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(register({ email, password, name }) as any);
  };
  const handleSocialSignup = (provider: string) => {
    setSocialMsg(`Social signup with ${provider} will be added soon!`);
    setTimeout(() => setSocialMsg(""), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-200">
      <Navbar />
      <div className="flex-1 flex items-center justify-center m-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center animate-fadeIn">
          <h1 className="text-3xl font-extrabold text-green-700 mb-2">
            Sign Up
          </h1>
          <p className="text-gray-500 mb-6">
            Create your account and start shopping!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex items-center border rounded px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none flex-1"
                required
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none flex-1"
                required
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none flex-1"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition flex items-center justify-center"
            >
              {status === "loading" ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : null}
              {status === "loading" ? "Registering..." : "Register"}
            </button>
          </form>
          {status === "succeeded" && user && (
            <div className="mt-4 text-green-600 font-medium text-center animate-fadeInUp">
              Registration successful! Welcome, {user.email}
            </div>
          )}
          {error && (
            <div className="mt-4 text-red-600 font-medium text-center animate-fadeInUp">
              {error}
            </div>
          )}
          <div className="w-full flex flex-col gap-3 mt-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition"
              onClick={() => handleSocialSignup("Google")}
            >
              <FaGoogle /> Sign up with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
              onClick={() => handleSocialSignup("Facebook")}
            >
              <FaFacebookF /> Sign up with Facebook
            </button>
          </div>
          {socialMsg && (
            <div className="mt-4 text-yellow-600 font-medium text-center animate-fadeInUp">
              {socialMsg}
            </div>
          )}
          <div className="mt-6 text-gray-500 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease both;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease both;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <Footer />
    </div>
  );
}
