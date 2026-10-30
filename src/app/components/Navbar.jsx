import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      {/* Added px-5 (20px) for left and right spacing */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/Booknok.png"
              width={50}
              height={50}
              alt="BookNook Logo"
              className="object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              Book<span className="text-indigo-600">Nook</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/books"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              All Books
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all px-4 py-2 rounded-lg shadow-sm hover:shadow"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
