import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black backdrop-blur-md shadow-2xl">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-serif font-bold text-white tracking-wide hover:text-pink-400 transition-colors duration-300"
        >
          PerfumeShop
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          {["Home"].map((link) => (
            <Link
              key={link}
              to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              className="relative text-white font-medium tracking-wide hover:text-pink-400 transition-colors duration-300"
            >
              {link}
              {/* Animated underline on hover */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
