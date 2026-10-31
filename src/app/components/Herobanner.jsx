"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Herobanner = () => {
  return (
    <section className="relative w-full  md:h-[650px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={800}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        className="w-full h-full hero-swiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-full flex items-center bg-slate-900 text-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("/image_one.jpg")` }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative max-w-7xl mx-auto px-6 z-10 space-y-4">
              <h1 className="text-[50px] font-extrabold">
                Discover Your Next Great Read
              </h1>
              <p className="text-lg">
                Explore thousands of books across all genres, from timeless
                classics to modern bestsellers.
              </p>
              <Link
                href="/books"
                className="inline-block px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full flex items-center bg-slate-900 text-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("/image_two.jpg")` }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative max-w-7xl mx-auto px-6 z-10 space-y-4">
              <h1 className="text-[50px] font-extrabold">
                Unlock Infinite World of Knowledge
              </h1>
              <p className="text-lg">
                Dive into compelling non-fiction, biographies, science, and
                self-improvement titles.
              </p>
              <Link
                href="/books"
                className="inline-block px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full flex items-center bg-slate-900 text-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("/image_three.jpg")` }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative max-w-7xl mx-auto px-6 z-10 space-y-4">
              <h1 className="text-[50px] font-extrabold">
                Stories That Stay With You
              </h1>
              <p className="text-lg">
                Special edition novels, signed copies, and exclusive hardcovers
                for avid collectors.
              </p>
              <Link
                href="/books"
                className="inline-block px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Herobanner;
