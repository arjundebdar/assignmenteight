const Loading = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
      {/* Page Heading */}
      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="h-8 w-48 bg-slate-200 rounded-lg mb-3"></div>
        <div className="h-4 w-72 max-w-full bg-slate-200 rounded"></div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 bg-slate-50 border-b border-slate-200 px-5 py-5">
          <div className="h-3 w-28 bg-slate-200 rounded"></div>
          <div className="h-3 w-20 bg-slate-200 rounded"></div>
          <div className="h-3 w-24 bg-slate-200 rounded"></div>
          <div className="h-3 w-16 bg-slate-200 rounded mx-auto"></div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="grid grid-cols-4 gap-4 items-center px-5 py-5 border-b border-slate-100"
          >
            {/* Book Information */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-16 bg-slate-200 rounded-lg shrink-0"></div>
              <div className="space-y-2">
                <div className="h-4 w-28 bg-slate-200 rounded"></div>
                <div className="h-3 w-20 bg-slate-200 rounded"></div>
              </div>
            </div>

            {/* Category */}
            <div className="h-7 w-20 bg-slate-200 rounded-full"></div>

            {/* Copies */}
            <div className="h-4 w-12 bg-slate-200 rounded"></div>

            {/* Actions */}
            <div className="flex justify-center gap-2">
              <div className="h-9 w-16 bg-slate-200 rounded-lg"></div>
              <div className="h-9 w-20 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Loading;
