"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import app from "../../../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cartSlice";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (id) {
        const db = getFirestore(app);
        try {
          const docRef = doc(db, "products", String(id));
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            setProduct(null);
          }
        } catch (error) {
          setProduct(null);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, qty: 1 }));

    router.push("/cart"); 

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-blue-600 text-lg mt-20">
          <span className="animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 h-12 w-12 inline-block mr-4"></span>
          Loading product...
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-gray-500 text-lg mt-20">
          Product not found.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full px-4 flex-1 mt-20">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-xl object-cover shadow-lg mb-4 md:mb-0"
            unoptimized
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
              {product.name}
            </h1>
            <div className="text-lg text-gray-600 mb-4">{product.category}</div>
            <div className="font-bold text-2xl text-blue-600 mb-4">
              ${product.price}
            </div>
            <div className="mb-4 text-gray-700">{product.description}</div>
            <div className="flex gap-2 mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                Rating: {product.rating}
              </span>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <div className="mt-6">
              <Link href="/products" className="text-blue-600 hover:underline">
                ← Back to Products
              </Link>
            </div>
            {showToast && (
              <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
                Added to cart!
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
