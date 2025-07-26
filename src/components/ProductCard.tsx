export default function ProductCard({
  product,
  compact = false,
}: {
  product: any;
  compact?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`bg-white roundedxl shadow-lg flex flex-col items-center border border-gray-100 hover:border-blue-400 transition-all ${
        compact ? "p-2 md:p-3" : "p-4"
      }`}
    >
      <div className="w-full flex justify-center">
        <div
          className={`${
            compact
              ? "w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
              : "w-[160px] h-[160px]"
          } flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg mb-2`}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={compact ? 90 : 160}
            height={compact ? 90 : 160}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <Link
        href={`/products/${product.id}`}
        className={`font-semibold ${
          compact ? "text-base md:text-lg" : "text-lg"
        } mb-1 text-gray-800 text-center line-clamp-1 hover:text-blue-600 transition`}
      >
        {product.name}
      </Link>
      <div className={`flex items-center gap-1 ${compact ? "mb-0" : "mb-1"}`}>
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < Math.round(product.rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
        <span className="text-xs text-gray-500 ml-2">{product.rating}</span>
      </div>
      <div
        className={`font-bold ${
          compact ? "text-base md:text-lg" : "text-xl"
        } text-blue-600 ${compact ? "mb-1" : "mb-2"}`}
      >
        ${product.price}
      </div>
      <Link
        href={`/products/${product.id}`}
        className={`bg-blue-600 hover:bg-blue-700 text-white ${
          compact ? "px-2 py-1 text-xs md:text-sm" : "px-4 py-2"
        } rounded-full font-semibold shadow transition w-full text-center`}
      >
        View Details
      </Link>
    </motion.div>
  );
}
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
