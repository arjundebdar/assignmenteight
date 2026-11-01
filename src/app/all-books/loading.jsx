import React from "react";

const Loading = () => {
  return (
    <section className="w-full bg-slate-50 py-20 px-5 sm:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="h-12 sm:h-14 w-64 bg-slate-200 rounded-lg"></div>

          <div className="h-5 w-80 max-w-full bg-slate-200 rounded mt-5"></div>

          <div className="w-20 h-1 bg-slate-200 rounded-full mt-6"></div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
            >
              {/* Book Image Skeleton */}
              <div className="w-full h-[320px] bg-slate-200"></div>

              {/* Book Information Skeleton */}
              <div className="p-6">
                {/* Category */}
                <div className="h-6 w-24 bg-slate-200 rounded-full"></div>

                {/* Title */}
                <div className="space-y-2 mt-4">
                  <div className="h-6 w-full bg-slate-200 rounded"></div>
                  <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                </div>

                {/* Author */}
                <div className="h-4 w-32 bg-slate-200 rounded mt-4"></div>

                {/* View Details */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="h-5 w-28 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
