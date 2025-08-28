import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ productId, onReviewAdded }) {
  const [form, setForm] = useState({ user: "", comment: "", rating: 5 });

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${productId}/reviews`,
        form
      );
      onReviewAdded(res.data);
      setForm({ user: "", comment: "", rating: 5 });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <form
      onSubmit={submitReview}
      className="mt-10 p-8 rounded-3xl shadow-[0_0_40px_rgba(255,105,180,0.2)] 
                 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 
                 backdrop-blur-md border border-pink-500/20 space-y-5"
    >
      <h3 className="text-2xl font-bold text-pink-400 tracking-wide">
        💬 Write a Review
      </h3>

      {/* Name Input */}
      <input
        className="w-full border border-gray-700 bg-gray-900 text-white 
                   p-3 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-pink-400 transition shadow-inner"
        placeholder="Your Name"
        value={form.user}
        onChange={(e) => setForm({ ...form, user: e.target.value })}
      />

      {/* Comment Box */}
      <textarea
        className="w-full border border-gray-700 bg-gray-900 text-white 
                   p-3 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-pink-400 transition shadow-inner"
        placeholder="Write a review..."
        rows={4}
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
      ></textarea>

      {/* Rating Dropdown */}
      <div className="flex items-center space-x-4">
        <label className="text-gray-300 font-medium">Rating:</label>
        <select
          className="border border-gray-700 bg-gray-900 text-white 
                     px-4 py-2 rounded-xl focus:outline-none focus:ring-2 
                     focus:ring-pink-400 transition"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 
                   text-white font-semibold px-6 py-3 rounded-2xl shadow-lg 
                   hover:shadow-[0_0_25px_rgba(255,105,180,0.6)] 
                   hover:scale-105 transition-all duration-300"
      >
        Submit Review
      </button>
    </form>
  );
}
