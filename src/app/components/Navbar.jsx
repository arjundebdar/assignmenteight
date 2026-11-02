"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Handle Sign Out
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
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
              href="/all-books"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              All Books
            </Link>

            {/* Private Navigation Links */}
            {!isPending && session?.user && (
              <>
                <Link
                  href="/addbooks"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Add Book
                </Link>

                <Link
                  href="/my-books"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  My Books
                </Link>

                <Link
                  href="/my-borrowed-books"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  My Borrowed Books
                </Link>
              </>
            )}
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <div className="flex items-center gap-3 animate-pulse">
                {/* User Profile Skeleton */}
                <div className="hidden sm:flex flex-col items-end gap-2">
                  <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                  <div className="h-3 w-36 bg-gray-100 rounded-md"></div>
                </div>

                {/* Button Skeleton */}
                <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
              </div>
            ) : session?.user ? (
              <>
                {/* User Profile */}
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-gray-800">
                    {session.user.name}
                  </span>

                  <span className="text-xs text-gray-500">
                    {session.user.email}
                  </span>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all px-4 py-2 rounded-lg shadow-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                {/* Sign In */}
                <Link
                  href="/signin"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </Link>

                {/* Sign Up */}
                <Link
                  href="/signup"
                  className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all px-4 py-2 rounded-lg shadow-sm hover:shadow"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
