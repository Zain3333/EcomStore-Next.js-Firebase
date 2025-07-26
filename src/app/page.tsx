"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductSlider from "../components/ProductSlider";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import type { RootState, AppDispatch } from "../store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status } = useSelector(
    (state: RootState) => state.products
  );

  // Categories for filtering
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Toys",
    "Mobiles",
    "Appliances",
    "Books",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p: any) => p.category === selectedCategory);

  // Pagination for 'Just For You' section
  const PRODUCTS_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedForYou = filteredProducts.slice(
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

  // Example: featured = first 6, trending = next 3
  const featuredProducts = filteredProducts.slice(0, 6);
  // For You: next 8 products after trending
  const forYouProducts = filteredProducts.slice(0, 9);

  return (
    <div className="min-h-screen flex flex-col font-sans ">
      <Navbar />
      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-12 bg-white md:h-[60vh]">
        <div className="max-w-xl w-full">
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-700 mb-4 text-center md:text-left">
            Welcome to <span className="text-blue-500">EcomStore</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6 text-center md:text-left">
            Discover the best deals on electronics, fashion, and more.
            <br className="hidden md:block" /> Shop with confidence and enjoy
            fast delivery!
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-full font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <Image
            src="/banner.png"
            alt="Ecommerce Hero"
            width={400}
            height={320}
            className="w-full max-w-md"
            priority
          />
        </div>
      </header>

      {/* Categories Section */}
      <section className="px-4 md:px-8 pt-4 pb-2">
        <div className="flex flex-wrap gap-2 justify-center">
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
      </section>

      {/* For You Section (Responsive Grid, compact cards) */}
      {status === "succeeded" && paginatedForYou.length > 0 && (
        <section className="max-w-7xl mx-auto w-full px-2 md:px-2 py-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700 text-center flex items-center justify-center gap-2">
            Just For You
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 xl:gap-5">
            {paginatedForYou.map((product: any) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
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
        </section>
      )}

      {/* Featured Products */}
      <div className="my-3 md:my-8">
        {status === "loading" && (
          <div className="text-center py-8 text-blue-600 font-semibold">
            Loading products...
          </div>
        )}
        {status === "succeeded" && featuredProducts.length > 0 && (
          <ProductSlider
            products={featuredProducts}
            title="Featured Products"
          />
        )}
        {status === "succeeded" && featuredProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No featured products found.
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
