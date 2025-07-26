"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import {
  FaGoogle,
  FaFacebookF,
  FaLock,
  FaEnvelope,
  FaSpinner,
} from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socialMsg, setSocialMsg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login({ email, password }) as any);
  };

  useEffect(() => {
    if (status === "succeeded" && user) {
      setTimeout(() => {
        router.push("/");
      }, 1200);
    }
  }, [status, user, router]);

  const handleSocialSignup = (provider: string) => {
    setSocialMsg(`Social signup with ${provider} will be added soon!`);
    setTimeout(() => setSocialMsg(""), 2500);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
        <Navbar />
        <div className="flex-1 flex items-center justify-center m-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
              Sign In
            </h1>
            <p className="text-gray-500 mb-6">
              Welcome back! Please login to your account.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
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
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {status === "loading" ? "Logging in..." : "Login"}
              </button>
              {error && <div className="text-red-600">{error}</div>}
            </form>
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
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
        <Footer />
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
    </>
  );
}
