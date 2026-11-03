import Image from "next/image";
import { Suspense } from "react";
import Herobanner from "./components/Herobanner";
import Bookslist from "./components/NewArivals";
import BookContributor from "./components/BookContributor";
import ExploreCategories from "./components/ExploreCategories";
export default function Home() {
  return (
    <div>
      <Suspense
        fallback={
          <section className="w-full md:h-[650px] bg-slate-900 animate-pulse" />
        }
      >
        <Herobanner />
        <Bookslist />
        <BookContributor />
        <ExploreCategories />
      </Suspense>
    </div>
  );
}
