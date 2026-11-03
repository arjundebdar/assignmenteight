import Link from "next/link";

export default function BookContributor() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-emerald-950 px-8 py-16 text-center text-white md:px-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-700/30 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-5 inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-emerald-200">
            Share Your Knowledge
          </span>

          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            Become a Book Contributor
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-emerald-100/80">
            Have books you no longer read? Add them to BookNook and let other
            readers discover your collection. Your contribution can inspire
            someone to start a new reading journey.
          </p>

          <Link
            href="/addbooks"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-emerald-950 transition hover:bg-emerald-100"
          >
            Add Your Book →
          </Link>
        </div>
      </div>
    </section>
  );
}
