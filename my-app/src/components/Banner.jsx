import { useEffect, useState } from "react";
import ColorThief from "colorthief";

export default function LuxurySection() {
  const [colors, setColors] = useState(["#2a0f12", "#1a0a0b", "#0d0506"]);

  useEffect(() => {
    const img = new Image();
    img.src = "image.jpg";
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 3); // 3 dominant colors
      setColors(palette.map(([r, g, b]) => `rgb(${r},${g},${b})`));
    };
  }, []);

  return (
    <div
      className="relative text-white py-24 px-6"
      style={{
        background: `linear-gradient(to bottom, ${"#000000"}, ${colors[1]}, ${"#2a0f12"})`,
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-snug text-white">
            EXPERIENCE LUXURY & ELEGANCE
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our fragrance are crafted to elevate your senses and leave a lasting
            impression.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-pink-400 text-3xl">🌸</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Long-Lasting Fragrance
                </h3>
                <p className="text-gray-400">
                  Enjoy all-day freshness with premium essential perfumes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-pink-400 text-3xl">🪔</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Finest Natural Ingredients
                </h3>
                <p className="text-gray-400">
                  Crafted with nature and high-quality extracts with luxurious
                  scents.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-pink-400 text-3xl">🌿</span>
              <div>
                <h3 className="text-lg font-semibold">Sustainable & Ethical</h3>
                <p className="text-gray-400">
                  Eco-friendly packaging and reliable source materials.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Perfume Image */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-80 h-[28rem] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#2c0f15] to-black">
            <img
              src="image.jpg" // replace with your perfume image
              alt="Perfume"
              className="absolute inset-0 w-full h-full object-fit"
            />
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center mt-20">
        <h3 className="text-2xl md:text-3xl font-serif tracking-wide text-white">
          DISCOVER FEATURED COLLECTION
        </h3>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
          Discover our signature scents crafted with elegance, sophistication
          and timeless allure.
        </p>
      </div>
    </div>
  );
}
