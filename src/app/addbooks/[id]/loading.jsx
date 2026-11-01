const Loading = () => {
  return (
    <section className="min-h-screen bg-slate-50 py-16 px-5 sm:px-8 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 sm:p-10 lg:p-14">
            {/* Book Image Skeleton */}
            <div className="bg-slate-100 rounded-2xl min-h-[400px] flex items-center justify-center">
              <div className="bg-slate-200 rounded-2xl"></div>
            </div>

            {/* Book Information Skeleton */}
            <div className="flex flex-col justify-center py-4">
              {/* Category */}
              <div className="mb-5">
                <div className="h-8 w-28 bg-slate-200 rounded-full"></div>
              </div>

              {/* Title */}
              <div className="space-y-3">
                <div className="h-10 w-full bg-slate-200 rounded-lg"></div>
                <div className="h-10 w-3/4 bg-slate-200 rounded-lg"></div>
              </div>

              {/* Author */}
              <div className="h-6 w-40 bg-slate-200 rounded-md mt-4"></div>

              <div className="w-16 h-1 bg-slate-200 rounded-full my-7"></div>

              {/* Description */}
              <div>
                <div className="h-6 w-44 bg-slate-200 rounded-md mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-200 rounded"></div>
                  <div className="h-4 w-full bg-slate-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                  <div className="h-4 w-4/5 bg-slate-200 rounded"></div>
                </div>
              </div>

              {/* Added By */}
              <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-4 w-24 bg-slate-200 rounded mb-5"></div>

                <div className="space-y-4">
                  <div>
                    <div className="h-3 w-12 bg-slate-200 rounded mb-2"></div>
                    <div className="h-5 w-36 bg-slate-200 rounded"></div>
                  </div>

                  <div>
                    <div className="h-3 w-28 bg-slate-200 rounded mb-2"></div>
                    <div className="h-5 w-48 bg-slate-200 rounded"></div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 my-6">
                  <div className="h-12 w-full sm:w-48 bg-slate-200 rounded-xl"></div>
                  <div className="h-12 w-full sm:w-44 bg-slate-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
