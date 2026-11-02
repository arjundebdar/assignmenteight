import React from "react";

const Loading = () => {
  return (
    <main className="min-h-screen animate-pulse bg-white">
      {/* Header */}
      <section className="border-b border-gray-200 px-5 py-8 text-center">
        <div className="mx-auto h-10 w-56 rounded-lg bg-gray-200" />
        <div className="mx-auto mt-4 h-4 w-72 max-w-full rounded bg-gray-200" />
      </section>

      {/* Form Skeleton */}
      <section className="mx-auto max-w-3xl px-5 py-10 sm:py-12">
        <div className="space-y-5">
          {/* Title & Author */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item}>
                <div className="mb-2 h-4 w-28 rounded bg-gray-200" />
                <div className="h-11 w-full rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Category & Copies */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item}>
                <div className="mb-2 h-4 w-28 rounded bg-gray-200" />
                <div className="h-11 w-full rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Book Image */}
          <div>
            <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-lg bg-gray-200" />
            <div className="mt-2 h-3 w-40 rounded bg-gray-200" />
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 h-4 w-36 rounded bg-gray-200" />
            <div className="h-24 w-full rounded-lg bg-gray-200" />
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item}>
                <div className="mb-2 h-4 w-28 rounded bg-gray-200" />
                <div className="h-11 w-full rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="h-12 w-full rounded-lg bg-gray-200" />
        </div>
      </section>
    </main>
  );
};

export default Loading;
