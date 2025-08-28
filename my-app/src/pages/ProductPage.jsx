import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ColorThief from "colorthief";


export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState(["#2a0f12", "#1a0a0b", "#0d0506"]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        console.log("Product API response:", res.data);
        setProduct(res.data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  useEffect(() => {
    if (!product?.images?.[0]) return; // ✅ prevent null crashes

    const img = new Image();
    img.crossOrigin = "anonymous"; // needed for ColorThief
    img.src = product.images[0];

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 3);
        if (palette) {
          setColors(palette.map(([r, g, b]) => `rgb(${r},${g},${b})`));
        }
      } catch (err) {
        console.error("Color extraction failed:", err);
      }
    };

    img.onerror = () => {
      console.warn("Image failed to load, using fallback colors");
    };
  }, [product]);

  if (!product)
    return <p className="text-center mt-20 text-pink-400">Loading...</p>;

  return (
    <div className="min-h-screen text-white px-6 py-20"
    style={{
        background: `linear-gradient(to bottom, ${"#000000"}, ${colors[0]}, ${colors[1]})`,
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Image Section */}
        <div className="relative group">
          <div
            className="rounded-[2.5rem] overflow-hidden
                       transform group-hover:scale-105 
                       transition-all duration-700 ease-out"
          >
            <img
              src={product.images?.[0] || "https://via.placeholder.com/400x300"}
              alt={product.name || "Perfume"}
              className="w-full h-[550px] object-cover"
            />
          </div>
          
        </div>

        {/* Details Section */}
        <div className="rounded-[2rem] p-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-sm tracking-wide">
            {product.name || "Luxury Perfume"}
          </h1>
          <p className="mt-6 text-gray-300 leading-relaxed text-lg">
            {product.description ||
              "Indulge in timeless elegance with this fragrance."}
          </p>

          <p className="mt-8 text-yellow-400 font-bold text-4xl drop-shadow-md">
            ${product.price ?? "N/A"}
          </p>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white uppercase tracking-wide">
              Available Sizes
            </h3>
            <div className="mt-4 flex flex-wrap gap-4">
              {product.sizes?.length > 0 ? (
                product.sizes.map((size, i) => (
                  <span
                    key={i}
                    className="px-5 py-2 rounded-full border border-pink-400/60 
                               text-pink-300 font-semibold shadow-md 
                               hover:bg-pink-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {size}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">Not available</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-6">
            <button
              className="bg-gradient-to-r from-pink-500 to-purple-600 
                               hover:from-purple-600 hover:to-pink-500
                               text-white px-8 py-4 rounded-full 
                               shadow-[0_0_30px_rgba(236,72,153,0.5)] 
                               font-semibold text-lg transition duration-300 transform hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              className="bg-white/10 border border-pink-200/30 hover:bg-white/20 
                         text-pink-200 px-8 py-4 rounded-full shadow-md font-medium transition"
              onClick={() =>
                navigator.share &&
                navigator.share({
                  title: product.name,
                  url: window.location.href,
                })
              }
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div
        className="mt-24 bg-white/5 backdrop-blur-2xl 
                      shadow-2xl rounded-[2rem] p-12 border border-pink-200/20 relative z-10 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold mb-10 text-pink-300 tracking-wide">
          ✨ Customer Reviews
        </h2>

        {/* Reviews List */}
        {product.reviews?.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {product.reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white/10 rounded-2xl shadow-lg p-6 border border-pink-200/20 
                           hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* User + Rating */}
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-pink-200">{r.user}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < r.rating ? "text-yellow-400" : "text-gray-500"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-400">
                      ({r.rating}/5)
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-300 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-lg">
            No reviews yet. Be the first to share your experience!
          </p>
        )}

        {/* Review Form */}
        <div className="mt-12 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-pink-200/20">
          <h3 className="text-2xl font-bold mb-6 text-pink-300">
            Leave a Review
          </h3>
          <ReviewForm
            productId={product._id}
            onReviewAdded={(rev) =>
              setProduct({
                ...product,
                reviews: [...(product.reviews || []), rev],
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
