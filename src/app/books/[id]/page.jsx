import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsAlt } from "react-icons/bs";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BorrowButton from "./BorrowButton";

const BooksDetails = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/books/${id}`)}`);
  }

  const res = await fetch(`http://localhost:5000/books/${id}`);

  if (!res.ok) {
    return <h2>Book not found!</h2>;
  }

  const book = await res.json();

  return (
    <section className="min-h-screen bg-slate-50 py-16 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 sm:p-10 lg:p-14">
            {/* Book Image */}
            <div className="bg-slate-100 rounded-2xl flex">
              {book.image ? (
                <Image
                  src={book.image}
                  width={500}
                  height={500}
                  alt={book.title}
                  className="rounded-2xl"
                />
              ) : (
                <div className="text-center text-slate-400">
                  <span className="text-6xl">📚</span>
                  <p className="mt-3">No image available</p>
                </div>
              )}
            </div>

            {/* Book Information */}
            <div className="flex flex-col justify-center py-4">
              <div className="mb-5">
                <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                  {book.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                {book.title}
              </h1>

              <p className="text-lg text-indigo-600 font-semibold mt-4">
                By {book.author}
              </p>

              <div className="w-16 h-1 bg-indigo-600 rounded-full my-7"></div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  About This Book
                </h3>

                <p className="text-slate-600 leading-8 text-base">
                  {book.description.split(" ").slice(0, 50).join(" ")}
                </p>
              </div>

              {/* Added By */}
              <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-5">
                  Added By
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                      Name
                    </p>
                    <p className="text-slate-800 font-semibold">
                      {book.userName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                      Email Address
                    </p>
                    <p className="text-slate-800 font-medium break-all">
                      {book.userEmail}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 my-6 items-stretch sm:items-center">
                  <BorrowButton
                    bookId={book._id.toString()}
                    availableCopies={Number(book.totalCopies)}
                  />

                  <Link
                    href={"/"}
                    className="flex justify-center items-center gap-2 border border-slate-300 bg-white hover:bg-slate-100 hover:border-slate-400 active:scale-95 transition-all duration-300 py-3 px-6 text-slate-700 font-semibold rounded-xl shadow-sm"
                  >
                    Back To All Book
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksDetails;
