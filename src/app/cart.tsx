"use client";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.cart.items);

  const total = items.reduce((sum: number, item: any) => sum + (item.price || 0), 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          <ul className="mb-4">
            {items.map((item: any) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button
                  className="ml-4 text-red-600 hover:underline"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="font-bold mb-4">Total: ${total}</div>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
