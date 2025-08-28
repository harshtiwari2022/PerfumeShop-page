import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="bg-[#2a0f12]">
      {/* Banner */}
      <Banner />

      {/* Products Section */}
      <div className="container mx-auto px-6 py-20 ">
        <h2 className="text-5xl font-extrabold text-center mb-16 font-serif tracking-wide bg-white bg-clip-text text-transparent drop-shadow-lg">
          ✨ Our Exclusive Collection
        </h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-400">Loading products...</p>
        )}
      </div>
    </div>
  );
}
