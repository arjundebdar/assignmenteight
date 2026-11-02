"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // photoURL: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Registration
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    // photoURL
    const { name, email, password } = formData;

    // Password Validation
    if (password.length < 6) {
      toast("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast("Password must contain at least one lowercase letter.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name,
        email,
        password,
        // image: photoURL,
      });

      if (error) {
        toast(error.message);
        return;
      }

      // Registration Successful
      router.push("./signin");
    } catch (err) {
      toast(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Authentication
  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast("Google login failed");
      setGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex justify-center items-center px-5 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Your Account
          </h1>

          <p className="text-slate-500 mt-2">
            Join BookNook and explore your favorite books.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Photo URL */}
          <div>
            {/* <label className="block text-sm font-semibold text-slate-700 mb-2">
              Photo URL
            </label> */}

            {/* <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Enter your photo URL"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            /> */}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <p className="text-xs text-slate-400 mt-2">
              Minimum 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-sm text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-lg flex justify-center items-center gap-3 transition duration-300 disabled:opacity-50"
        >
          <span className="text-xl font-bold text-blue-600">G</span>

          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-500 mt-7">
          Already have an account?{" "}
          <Link
            href="./signin"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignupPage;
