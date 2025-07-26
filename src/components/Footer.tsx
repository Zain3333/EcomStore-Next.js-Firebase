import Link from "next/link";
import { FaStore, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2 mb-6 md:mb-0">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xl mb-2">
            <FaStore /> EcomStore
          </div>
          <p className="text-sm text-gray-400">Your trusted online shop for electronics, fashion, and more.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-blue-300">Useful Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/products" className="hover:text-blue-400 transition">Products</Link></li>
            <li><Link href="/cart" className="hover:text-blue-400 transition">Cart</Link></li>
            <li><Link href="/profile" className="hover:text-blue-400 transition">Profile</Link></li>
            <li><Link href="/login" className="hover:text-blue-400 transition">Login</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-blue-300">Contact Us</h3>
          <ul className="text-sm flex flex-col gap-2">
            <li>Email: <a href="mailto:zainrais333@gmail.com" className="hover:text-blue-400 transition">zainrais333@gmail.com</a></li>
            <li>Phone: <a href="tel:+923460496025" className="hover:text-blue-400 transition">(+92) 346-0496025</a></li>
            <li>Address: Liaquatabad, Karachi, Pakistan</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-blue-300">Follow Us</h3>
          <div className="flex gap-4 text-2xl mt-2">
            <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-300 transition"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-8">© 2025 EcomStore. All rights reserved.</div>
    </footer>
  );
}
