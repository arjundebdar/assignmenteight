"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { MdOutlineEdit, MdDelete } from "react-icons/md";

const MyBooksTable = ({ initialBooks }) => {
  const router = useRouter();

  const [books, setBooks] = useState(initialBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    totalCopies: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  // Open Edit Form
  const handleEdit = (book) => {
    setSelectedBook(book);

    setFormData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      totalCopies: book.totalCopies || "",
      description: book.description || "",
    });

    setImage(null);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Book
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedBook) return;

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append("image", image);
      }

      const res = await fetch(
        `http://localhost:5000/books/${selectedBook._id}`,
        {
          method: "PUT",
          body: data,
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Update failed");
      }

      toast.success("Book updated successfully!");

      // Update local table
      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id
            ? {
                ...book,
                ...formData,
                totalCopies: Number(formData.totalCopies),
                image: image ? result.image || book.image : book.image,
              }
            : book,
        ),
      );

      setSelectedBook(null);
      setImage(null);

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Book
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/books/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Delete failed");
      }

      setBooks((prev) => prev.filter((book) => book._id !== id));

      toast.success("Book deleted successfully!");

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputStyle =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400";

  return (
    <div>
      {/* Books Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Book Information
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Copies
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {books.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-16 px-5 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 6.5V19m0-12.5C10.5 5.5 8.5 5 5 5v13c3.5 0 5.5.5 7 1m0-12.5C13.5 5.5 15.5 5 19 5v13c-3.5 0-5.5.5-7 1"
                        />
                      </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-700">
                      No Books Found
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      You haven't added any books to your library yet.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-slate-50/80 transition-colors duration-200"
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-4">
                      <Image
                        src={book.image}
                        alt={book.title}
                        height={50}
                        width={50}
                        className="w-14 h-16 object-cover rounded-lg border border-slate-200"
                      />

                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                          {book.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          By {book.author}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {book.category}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <span className="text-sm font-semibold text-slate-700">
                      {book.totalCopies}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">copies</span>
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-100 hover:border-blue-600 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                      >
                        <MdOutlineEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 hover:border-red-600 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                      >
                        <MdDelete />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Book Form */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Library Management
                </span>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
                  Edit Book Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBook(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 text-2xl transition cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Book Title
                </label>

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
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Author Name
                </label>

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

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Total Copies
                </label>

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

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Book Description
                </label>

                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description about this book..."
                  className={`${inputStyle} resize-none`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Change Book Image
                  <span className="font-normal text-slate-400 ml-2">
                    (Optional)
                  </span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0] || null)}
                  className={`${inputStyle} file:mr-3 file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold file:px-3 file:py-1 file:rounded-md file:cursor-pointer`}
                />
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="w-full border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-sm shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Updating..." : "Update Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooksTable;
