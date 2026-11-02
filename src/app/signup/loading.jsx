const Loading = () => {
  return (
    <section className="min-h-screen bg-slate-50 flex justify-center items-center px-5 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 animate-pulse">
        {/* Title Skeleton */}
        <div className="text-center mb-8">
          <div className="h-9 w-48 bg-slate-200 rounded-lg mx-auto"></div>
          <div className="h-4 w-64 max-w-full bg-slate-200 rounded mt-4 mx-auto"></div>
        </div>

        {/* Form Skeleton */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <div className="h-4 w-16 bg-slate-200 rounded mb-3"></div>
            <div className="h-12 w-full bg-slate-200 rounded-lg"></div>
          </div>

          {/* Password */}
          <div>
            <div className="h-4 w-20 bg-slate-200 rounded mb-3"></div>
            <div className="h-12 w-full bg-slate-200 rounded-lg"></div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <div className="h-4 w-28 bg-slate-200 rounded"></div>
          </div>

          {/* Login Button */}
          <div className="h-12 w-full bg-slate-200 rounded-lg"></div>
        </div>

        {/* Signup Skeleton */}
        <div className="flex justify-center gap-2 mt-7">
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
          <div className="h-4 w-16 bg-slate-200 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
