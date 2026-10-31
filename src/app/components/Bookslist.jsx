import Image from "next/image";
import Link from "next/link";
import React from "react";

const bookDataList = async () => {
  const res = await fetch("http://localhost:5000/books");
  return res.json();
};

const Bookslist = async () => {
  const booksList = await bookDataList();

  console.log(booksList);

  return (
    <section className="w-full bg-slate-50 py-20 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            New <span className="text-indigo-600">Arrivals</span>
          </h2>

          <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-xl">
            Discover the latest books added by our readers.
          </p>

          <div className="w-20 h-1 bg-indigo-600 rounded-full mt-6"></div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {booksList
            .sort((a, b) => b._id.localeCompare(a._id))
            .slice(0, 8)
            .map((books) => (
              <div
                key={books._id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Book Image */}
                <div className="relative w-full h-[320px] bg-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  {typeof books.image === "string" &&
                  books.image.startsWith("https://") ? (
                    <Image
                      src={books.image}
                      width={300}
                      height={100}
                      alt={books.title || "Book cover"}
                      className="w-full h-full object-contain transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <span className="text-5xl">📚</span>
                      <p className="text-sm font-medium">No image available</p>
                    </div>
                  )}
                </div>

                {/* Book Information */}
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider bg-gray-300  rounded-2xl p-1">
                    {books.category}
                  </span>

                  <h3 className="text-xl font-bold text-slate-800 mt-2 line-clamp-2">
                    {books.title}
                  </h3>
                  <p>{books.author}</p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                    <Link href={`./books/${books._id}`}> View Details</Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Bookslist;
