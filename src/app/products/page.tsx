"use client";
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


const categories = ["All", "Electronics", "Fashion", "Mobiles"];

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productsSlice";
import type { RootState, AppDispatch } from "../../store/store";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status } = useSelector((state: RootState) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p: any) => p.category === selectedCategory);

  // Pagination
  const PRODUCTS_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // Reset to page 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
          All Products
        </h1>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold shadow text-sm transition border-2 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {status === "loading" && (
          <div className="text-center text-blue-600 py-12 text-lg font-semibold">Loading products...</div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 xl:gap-5">
          {status === "succeeded" && paginatedProducts.length > 0 && paginatedProducts.map((product: any, idx: number) => (
            <ProductCard key={product.id + '-' + idx} product={product} compact />
          ))}
        </div>
        {/* Pagination Controls */}
        {status === "succeeded" && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-blue-600 text-white font-semibold disabled:bg-gray-300 disabled:text-gray-500 transition"
            >
              Prev
            </button>
            <span className="mx-2 text-blue-700 font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-blue-600 text-white font-semibold disabled:bg-gray-300 disabled:text-gray-500 transition"
            >
              Next
            </button>
          </div>
        )}
        {status === "succeeded" && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 py-12 text-lg">
            No products found in this category.
          </div>
        )}
        {status === "failed" && (
          <div className="text-center text-red-500 py-12 text-lg">Failed to load products.</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
