import Image from "next/image";
import { Suspense } from "react";
import Herobanner from "./components/Herobanner";
import Bookslist from "./components/Bookslist";
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
      </Suspense>
    </div>
  );
}
