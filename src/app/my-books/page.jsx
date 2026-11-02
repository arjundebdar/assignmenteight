import React from "react";
import MyBooksTable from "./MyBooksTable";

const booksData = async () => {
  const res = await fetch("http://localhost:5000/books", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
};

const MyBooks = async () => {
  const datas = await booksData();

  return (
    <section className="min-h-screen px-5 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800">
            My Books <span className="text-cyan-600">Library</span>
          </h2>

          <p className="text-slate-500 mt-3 text-sm sm:text-base">
            Manage and keep track of all the books you've added to your library.
          </p>
        </div>

        <MyBooksTable initialBooks={datas} />
      </div>
    </section>
  );
};

export default MyBooks;
