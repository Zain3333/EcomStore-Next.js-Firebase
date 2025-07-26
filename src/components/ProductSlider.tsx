import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

function getSlidesPerView(width: number) {
  if (width < 640) return 1;
  if (width < 900) return 2;
  if (width < 1280) return 3;
  return 4;
}

export default function ProductSlider({
  products,
  title,
}: {
  products: any[];
  title: string;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function handleResize() {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - slidesPerView);

  const getCardWidth = () => {
    if (window.innerWidth < 640) return 320 + 16;
    if (window.innerWidth < 900) return 320 + 20;
    if (window.innerWidth < 1280) return 320 + 24;
    return 320 + 24;
  };
  const goTo = (idx: number) => {
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    if (sliderRef.current) {
      const cardWidth = getCardWidth();
      sliderRef.current.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="relative px-8 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 text-center flex items-center justify-center gap-2">
        {title}
      </h2>
      <div className="relative">
        <button
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 shadow-lg rounded-full p-3 text-white border-2 border-blue-700 hover:bg-blue-700 transition duration-200 ${
            current === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => goTo(current - 1)}
          aria-label="Scroll left"
          disabled={current === 0}
        >
          <FaChevronLeft />
        </button>
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto px-2 py-5 md:px-8 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="product-slide min-w-[320px] max-w-[320px] flex-shrink-0 scroll-snap-align-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 shadow-lg rounded-full p-3 text-white border-2 border-blue-700 hover:bg-blue-700 transition duration-200 ${
            current === maxIndex ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => goTo(current + 1)}
          aria-label="Scroll right"
          disabled={current === maxIndex}
        >
          <FaChevronRight />
        </button>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
