"use client";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../features/cartSlice';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state: any) => state.cart.items);
  const total = items.reduce((sum: number, item: any) => sum + (item.price * (item.qty || 1)), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 py-8 px-2 md:px-8 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8 text-center">Your Shopping Cart</h1>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500 text-lg">
            <FaShoppingCart className="text-7xl mb-6 text-blue-500" />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {items.map((item: any) => (
                <div key={item.id} className="flex items-center bg-white rounded-xl shadow p-4 gap-4 border border-gray-100 hover:border-blue-400 transition-all">
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-lg text-blue-700 line-clamp-1">{item.name}</div>
                    <div className="text-gray-500 text-sm mb-1">{item.category}</div>
                    <div className="text-blue-600 font-bold text-lg">${item.price}</div>
                    <div className="text-xs text-gray-400">Qty: {item.qty || 1}</div>
                  </div>
                  <button
                    className="ml-4 text-red-600 hover:text-white hover:bg-red-500 border border-red-200 rounded-full px-3 py-1 font-semibold transition"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-100 h-fit sticky top-28">
              <h2 className="text-xl font-bold text-blue-700 mb-2">Order Summary</h2>
              <div className="flex justify-between text-gray-700 font-semibold">
                <span>Items:</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-blue-700 border-t border-gray-200 pt-4">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              <button
                className="mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-full font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition text-lg"
                onClick={() => router.push('/checkout')}
              >
                Proceed to Checkout
              </button>
              <button
                className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-300 transition"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
