import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Link to={`/product/${product._id || ""}`}>
      <div
        className="group relative bg-gradient-to-b from-[#3b0f17] via-[#1a0b0d] to-[#000000] 
                   rounded-3xl shadow-xl overflow-hidden border border-[#4a1c1f]
                   hover:shadow-[0_20px_50px_rgba(255,182,193,0.4)] 
                   hover:-translate-y-3 transition-all duration-500 cursor-pointer"
      >
        {/* Image */}
        <div className="overflow-hidden rounded-t-3xl relative">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/400x300"}
            alt={product.name || "Perfume"}
            className="w-full h-60 object-cover transform 
                       group-hover:scale-110 group-hover:rotate-1 
                       transition-transform duration-700"
          />

          {/* Sparkle particles (luxury shimmer) */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 bg-pink-400/60 rounded-full blur-sm animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 relative z-10">
          <h3 className="text-lg font-serif font-semibold text-white 
                         group-hover:text-yellow-400 transition-colors">
            {product.name || "Unknown Perfume"}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mt-1">
            {product.description
              ? product.description.slice(0, 60) + "..."
              : "No description available"}
          </p>
          <p className="mt-4 text-yellow-500 font-bold text-lg tracking-wide">
            ${product.price ?? "N/A"}
          </p>
        </div>

        {/* Glow overlay */}
        <span className="absolute inset-0 rounded-3xl bg-gradient-to-br 
                         from-pink-400/10 to-purple-400/10 
                         opacity-0 group-hover:opacity-100 blur-2xl 
                         transition duration-500 pointer-events-none"></span>

        {/* Bottom reflection shadow */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 
                         w-10/12 h-1.5 bg-pink-400/10 rounded-full 
                         blur-xl shadow-lg"></span>
      </div>
    </Link>
  );
}
