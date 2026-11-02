const loading = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Hero Banner Skeleton */}
      <section className="w-full px-5 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="h-[350px] md:h-[550px] rounded-2xl bg-slate-200 flex flex-col justify-center px-8 md:px-16 gap-5">
            <div className="h-5 w-32 rounded bg-slate-300" />
            <div className="h-10 md:h-14 w-3/4 max-w-xl rounded bg-slate-300" />
            <div className="h-5 w-full max-w-md rounded bg-slate-300" />
            <div className="h-5 w-2/3 max-w-sm rounded bg-slate-300" />
            <div className="h-12 w-36 rounded-lg bg-slate-300 mt-3" />
          </div>
        </div>
      </section>

      {/* New Arrivals Skeleton */}
      <section className="w-full px-5 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <div className="h-9 w-56 rounded bg-slate-200" />
            <div className="h-4 w-72 max-w-full rounded bg-slate-200" />
          </div>

          {/* Books Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 p-4 space-y-4"
              >
                <div className="h-64 w-full rounded-lg bg-slate-200" />
                <div className="h-5 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-10 w-full rounded-lg bg-slate-200 mt-3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default loading;
