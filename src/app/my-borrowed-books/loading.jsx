import React from "react";

const Loading = () => {
  return (
    <section className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Heading Skeleton */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 h-9 w-64 rounded-lg bg-slate-200"></div>
          <div className="mx-auto h-4 w-80 max-w-full rounded bg-slate-200"></div>
        </div>

        {/* Books Card Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              {/* Image */}
              <div className="mb-5 h-52 w-full rounded-lg bg-slate-200"></div>

              {/* Book Title */}
              <div className="mb-3 h-6 w-3/4 rounded bg-slate-200"></div>

              {/* Author */}
              <div className="mb-5 h-4 w-1/2 rounded bg-slate-200"></div>

              {/* Borrow Date */}
              <div className="mb-3 h-4 w-full rounded bg-slate-200"></div>

              {/* Return Date */}
              <div className="mb-5 h-4 w-4/5 rounded bg-slate-200"></div>

              {/* Button */}
              <div className="h-10 w-full rounded-lg bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
