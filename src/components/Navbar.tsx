"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  FaUserCircle,
  FaSignInAlt,
  FaSearch,
  FaShoppingCart,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const user = useSelector((state: any) => state.auth.user);
  const cartCount = useSelector((state: any) =>
    state.cart.items.reduce(
      (sum: number, item: any) => sum + (item.qty || 1),
      0
    )
  );
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="w-full shadow bg-white sticky top-0 left-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-700 font-bold text-xl hover:text-blue-900 transition"
          >
            <FaHome /> EcomStore
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-700 font-medium transition"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-700 font-medium transition relative"
          >
            <FaShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <FaSearch className="absolute right-3 top-2 text-gray-400" />
          </div>
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition"
              >
                <FaUserCircle /> Profile
              </Link>
              <Link
                href="/"
                className="text-red-500 font-semibold hover:text-red-700 transition"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition"
            >
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl text-blue-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
            className="md:hidden bg-white shadow-lg px-4 py-4 flex flex-col gap-4 border-t"
          >
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-700 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-700 font-medium transition relative"
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart /> Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
              />
              <FaSearch className="absolute right-3 top-2 text-gray-400" />
            </div>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUserCircle /> Profile
                </Link>
                <Link
                  href="/"
                  className="text-red-500 font-semibold hover:text-red-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition"
                onClick={() => setMenuOpen(false)}
              >
                <FaSignInAlt /> Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
