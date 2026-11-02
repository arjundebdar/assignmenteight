"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

const MyBorrowedBooks = () => {
  const { data: session, isPending } = useSession();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  const router = useRouter();

  // Fetch Borrowed Books
  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchBorrowedBooks = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/my-borrows/${encodeURIComponent(
            session.user.email,
          )}`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch borrowed books");
        }

        const data = await res.json();
        setBooks(data);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [session, isPending]);

  // Return Book
  const handleReturn = async (id) => {
    const confirmReturn = window.confirm(
      "Are you sure you want to return this book?",
    );

    if (!confirmReturn) return;

    setLoadingId(id);

    try {
      const res = await fetch(`http://localhost:5000/borrow/${id}/return`, {
        method: "PATCH",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to return book");
      }

      setBooks((prev) => prev.filter((book) => book._id !== id));

      toast.success("Book returned successfully!");

      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  // Format Date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Loading
  if (isPending || loading) {
    return (
      <section className="min-h-screen bg-slate-50 px-5 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-10">
            <div className="h-10 w-64 bg-slate-200 rounded-lg mx-auto animate-pulse"></div>
            <div className="h-4 w-80 max-w-full bg-slate-200 rounded mx-auto mt-4 animate-pulse"></div>
          </div>

          {/* Table Skeleton */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                {/* Table Header */}
                <thead className="bg-slate-100">
                  <tr>
                    {[
                      "Book Information",
                      "Borrow Date",
                      "Return Date",
                      "Action",
                    ].map((item) => (
                      <th key={item} className="px-5 py-4">
                        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Rows Skeleton */}
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3, 4].map((item) => (
                    <tr key={item}>
                      {/* Book Information */}
                      <td className="px-5 py-5 min-w-[250px]">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-16 bg-slate-200 rounded-lg animate-pulse"></div>
                          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
                        </div>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-5 py-5">
                        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                      </td>

                      {/* Return Date */}
                      <td className="px-5 py-5">
                        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-5 text-center">
                        <div className="h-9 w-28 bg-slate-200 rounded-lg mx-auto animate-pulse"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Login Check
  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800">Please login first</h2>

        <button
          onClick={() => router.push("/signin")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            My Borrowed <span className="text-cyan-600">Books</span>
          </h1>

          <p className="text-slate-500 mt-3">
            Keep track of your borrowed books and return them on time.
          </p>
        </div>

        {/* Empty State */}
        {books.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📚</div>

            <h2 className="text-xl font-bold text-slate-800">
              No Borrowed Books
            </h2>

            <p className="text-slate-500 mt-2">
              You haven't borrowed any books yet.
            </p>
          </div>
        ) : (
          /* Borrowed Books Table */
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 text-sm">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      Book Information
                    </th>

                    <th className="px-5 py-4 font-semibold">Borrow Date</th>

                    <th className="px-5 py-4 font-semibold">Return Date</th>

                    <th className="px-5 py-4 font-semibold text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {books.map((book) => (
                    <tr key={book._id} className="hover:bg-slate-50 transition">
                      {/* Book Information */}
                      <td className="px-5 py-5 min-w-[250px]">
                        <div className="flex items-center gap-4">
                          <Image
                            src={book.image}
                            alt={book.title}
                            width={50}
                            height={50}
                            className="w-14 h-16 object-cover rounded-lg border border-slate-200"
                          />

                          <h3 className="font-semibold text-slate-800">
                            {book.title}
                          </h3>
                        </div>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-5 py-5 text-sm text-slate-600 whitespace-nowrap">
                        {formatDate(book.borrowDate)}
                      </td>

                      {/* Return Date */}
                      <td className="px-5 py-5 text-sm text-slate-600 whitespace-nowrap">
                        {formatDate(book.returnDate)}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-5 text-center">
                        <button
                          onClick={() => handleReturn(book._id)}
                          disabled={loadingId === book._id}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
                        >
                          {loadingId === book._id
                            ? "Returning..."
                            : "Return Back"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBorrowedBooks;
