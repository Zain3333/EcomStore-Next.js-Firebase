"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  if (status === 'loading') return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product: any) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col">
            <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
            <p className="mb-2">{product.description}</p>
            <p className="mb-2 font-bold">${product.price}</p>
            <button
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
