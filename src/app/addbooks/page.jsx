"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Upload, BookOpen } from "lucide-react";

export default function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    totalCopies: "4",
    image: null,
    imageName: "No file chosen",
    description: "",
    userName: "Md Shahriyar Alam",
    userEmail: "mdshahriyaralam9@gmail.com",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Cleanup image preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
      imageName: file.name,
    }));

    setPreviewUrl(URL.createObjectURL(file));
    setError("");
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim() || !formData.author.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(formData.totalCopies) < 1) {
      setError("Total copies must be at least 1.");
      return;
    }

    try {
      const bookData = new FormData();

      bookData.append("title", formData.title);
      bookData.append("author", formData.author);
      bookData.append("category", formData.category);
      bookData.append("totalCopies", formData.totalCopies);
      bookData.append("description", formData.description);
      bookData.append("userName", formData.userName);
      bookData.append("userEmail", formData.userEmail);

      if (formData.image) {
        bookData.append("image", formData.image);
      }

      const res = await fetch("http://localhost:5000/booksList", {
        method: "POST",
        body: bookData,
      });

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      const result = await res.json();

      console.log("Book added:", result);

      setSubmitted(true);
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen  text-gray-800 flex flex-col justify-center items-center py-12 px-4 sm:px-6 font-sans">
      {/* Header Section */}
      <div className="text-center mb-10 max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-2 ">
          Add a Book
        </h1>
        <hr />

        <p className="text-gray-500 text-sm sm:text-base font-light">
          Put a book from your shelf into the library catalog.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#88ba92] to-transparent" />

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 p-4 bg-[#88ba92]/15 border border-[#88ba92]/40 rounded-xl flex items-center gap-3 text-[#548a61] text-sm">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="font-medium">Book added successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2"
              >
                Book Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. The Great Gatsby"
                required
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#88ba92] focus:ring-2 focus:ring-[#88ba92]/20 transition-all shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2"
              >
                Author Name
              </label>

              <input
                id="author"
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. F. Scott Fitzgerald"
                required
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#88ba92] focus:ring-2 focus:ring-[#88ba92]/20 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Row 2: Category & Total Copies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label
                htmlFor="category"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#88ba92] focus:ring-2 focus:ring-[#88ba92]/20 transition-all cursor-pointer shadow-sm"
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="totalCopies"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2"
              >
                Total Copies
              </label>

              <input
                id="totalCopies"
                type="number"
                name="totalCopies"
                min="1"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#88ba92] focus:ring-2 focus:ring-[#88ba92]/20 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Row 3: Book Cover Image */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Book Cover Image
            </label>

            <div className="relative flex items-center bg-gray-50 border border-gray-300 rounded-xl overflow-hidden group hover:border-[#88ba92] transition-all shadow-sm">
              <label className="px-5 py-3 bg-gray-100 text-xs font-medium text-gray-700 cursor-pointer border-r border-gray-300 hover:bg-gray-200 flex items-center gap-2 transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#639b70]" />
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <span className="px-4 text-xs text-gray-500 truncate flex-1">
                {formData.imageName}
              </span>
            </div>

            {previewUrl && (
              <div className="mt-3 flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-xl w-fit">
                <img
                  src={previewUrl}
                  alt="Book cover preview"
                  className="w-12 h-16 object-cover rounded-lg shadow"
                />

                <span className="text-xs text-gray-500 pr-3">
                  Preview attached
                </span>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-2">
              Supported formats: JPG, PNG, WEBP. Maximum size: 5MB.
            </p>
          </div>

          {/* Row 4: Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2"
            >
              Short Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief overview of the book..."
              className="w-full bg-white border border-gray-300 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#88ba92] focus:ring-2 focus:ring-[#88ba92]/20 transition-all resize-y min-h-[90px] shadow-sm"
            />
          </div>

          {/* Row 5: User Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-6 border-t border-gray-200">
            <div>
              <label
                htmlFor="userName"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2"
              >
                User Name
              </label>

              <input
                id="userName"
                type="text"
                name="userName"
                value={formData.userName}
                readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="userEmail"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2"
              >
                User Email
              </label>

              <input
                id="userEmail"
                type="email"
                name="userEmail"
                value={formData.userEmail}
                readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed shadow-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#88ba92] to-[#78a882] hover:from-[#7dae86] hover:to-[#6d9d77] text-white font-bold py-3.5 px-6 rounded-xl text-sm tracking-wide transition-all shadow-lg hover:shadow-[#88ba92]/20 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Add Book to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
