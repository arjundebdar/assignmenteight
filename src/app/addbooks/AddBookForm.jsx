"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    totalCopies: "",
    description: "",
    userName: "",
    userEmail: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = useSession();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImage(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      e.target.value = "";
      setImage(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB");
      e.target.value = "";
      setImage(null);
      return;
    }

    setImage(file);
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select a book image");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append("image", image);

      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add book");
      }

      toast.success("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        category: "",
        totalCopies: "",
        description: "",
        userName: "",
        userEmail: "",
      });

      setImage(null);
      e.target.reset();
    } catch (error) {
      console.error("Add Book Error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        userName: session.user.name || "",
        userEmail: session.user.email || "",
      }));
    }
  }, [session]);
  // Common Styles
  const inputStyle =
    "w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500";

  const labelStyle = "block text-sm mb-1.5";

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="border-b py-8 px-5 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold ">
          Add a <span className="text-cyan-600">Book</span>
        </h1>

        <p className="text-sm mt-3">
          Put a book from your shelf into the library.
        </p>
      </section>

      {/* Form Section */}
      <section className="max-w-3xl mx-auto px-5 py-10 sm:py-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Book Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Author Name</label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={inputStyle}
                required
              />
            </div>
          </div>

          {/* Category & Total Copies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>

                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>Total Copies</label>

              <input
                type="number"
                name="totalCopies"
                min="1"
                value={formData.totalCopies}
                onChange={handleChange}
                placeholder="Enter total copies"
                className={inputStyle}
                required
              />
            </div>
          </div>

          {/* Book Image */}
          <div>
            <label className={labelStyle}>Book Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`${inputStyle} file:mr-3 file:border-0 file:bg-transparent file:text-gray-800 file:cursor-pointer`}
              required
            />

            <p className="text-xs text-gray-500 mt-1">
              Maximum image size: 5 MB
            </p>
          </div>

          {/* Description */}
          <div>
            <label className={labelStyle}>Short Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Write a short description about this book..."
              className={`${inputStyle} resize-y`}
              required
            />
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>User Name</label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
                readOnly
              />
            </div>

            <div>
              <label className={labelStyle}>User Email</label>

              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
                readOnly
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8bc99d] hover:bg-[#75b989] text-[#142019] font-medium text-sm py-3 rounded-lg transition duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddBookPage;
