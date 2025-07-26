"use client";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { clearCart } from '../../features/cartSlice';
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.cart.items);
  const total = items.reduce((sum: number, item: any) => sum + (item.price * (item.qty || 1)), 0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    payment: 'cod',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(clearCart());
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <Image src="/vercel.svg" alt="Success" width={80} height={80} className="mb-6" />
          <h1 className="text-2xl font-bold text-blue-700 mb-2">Thank you for your order!</h1>
          <p className="text-gray-600 mb-4 text-center">Your order has been placed successfully. We will contact you soon.</p>
          <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow transition">Continue Shopping</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto w-full px-2 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8 text-center">Checkout</h1>
        <div className="bg-white rounded-xl shadow p-6 md:p-8 flex flex-col gap-8 md:flex-row">
          {/* Order Summary */}
          <div className="md:w-1/2 w-full flex flex-col gap-4 border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Order Summary</h2>
            {items.length === 0 ? (
              <div className="text-gray-500">Your cart is empty.</div>
            ) : (
              <ul className="flex flex-col gap-3">
                {items.map((item: any) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.name} width={56} height={56} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base text-blue-700 line-clamp-1">{item.name}</div>
                      <div className="text-xs text-gray-400">Qty: {item.qty || 1}</div>
                    </div>
                    <div className="font-bold text-blue-600 text-base">${item.price}</div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between text-lg font-bold text-blue-700 border-t border-gray-200 pt-4 mt-4">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
          {/* Checkout Form */}
          <form className="md:w-1/2 w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Shipping Details</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div className="flex  gap-4 items-center mt-2">
              <label className="font-semibold text-gray-700">Payment:</label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} />
                Credit/Debit Card
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-full font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition text-lg"
              disabled={items.length === 0}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
