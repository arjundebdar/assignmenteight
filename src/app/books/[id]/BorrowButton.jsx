"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { BsAlt } from "react-icons/bs";

const BorrowButton = ({ bookId, availableCopies }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    if (isPending || !session?.user) {
      toast.error("Please login first");
      return;
    }

    if (availableCopies <= 0) {
      toast.error("This book is currently unavailable");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          userName: session.user.name,
          userEmail: session.user.email,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to borrow book");
      }

      toast.success("Book borrowed successfully!");

      router.push("/my-borrowed-books");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={loading || isPending || availableCopies <= 0}
      className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-300 py-3 px-6 text-white font-semibold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <BsAlt className="text-2xl" />

      {loading
        ? "Borrowing..."
        : availableCopies <= 0
          ? "Unavailable"
          : "Borrow This Book"}
    </button>
  );
};

export default BorrowButton;
