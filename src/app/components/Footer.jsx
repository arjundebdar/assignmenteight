import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";

async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

import {
  FaGithub,
  FaTelegram,
  FaInstagram,
  FaFacebook,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";
import { GoMail } from "react-icons/go";
const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-white text-gray-600">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Bio */}
          <div className="space-y-4 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Booknok.png"
                width={40}
                height={40}
                alt="BookNook Logo"
                className="object-contain"
              />
              <span className="text-[25px] font-bold tracking-tight text-gray-900">
                Book<span className="text-indigo-600">Nook</span>
              </span>
            </Link>
            <p className="text-sm font-bold text-gray-600 max-w-sm leading-relaxed">
              Your ultimate digital sanctuary for discovering, sharing, and
              exploring thousands of books. Connect with a community of
              passionate readers today.
            </p>
            {/* Social Links with Inline SVGs */}
            <div className="flex gap-2">
              <Link href={"/"}>
                <FaFacebook className="text-2xl" />
              </Link>

              <Link href={"/"}>
                <FaGithub className="text-2xl" />
              </Link>
              <Link href={"/"}>
                <FaTelegram className="text-2xl" />
              </Link>
              <Link href={"/"}>
                <FaInstagram className="text-2xl" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="hover:text-indigo-600 transition-colors"
                >
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2.5">
                <FaLocationArrow className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Fonix Road, Fulbariya, Sahabag, Dhaka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>+88 01700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <GoMail className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>support@booknook.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-400">
          <p> @ {getCurrentYear()} BookNook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
