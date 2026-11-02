"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { requestPasswordReset } from "@/lib/auth-client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await requestPasswordReset({
        email,
        redirectTo: "http://localhost:3000/reset-password",
      });

      if (error) throw new Error(error.message);

      setSent(true);
      toast.success("Check your email for the reset link!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex justify-center items-center px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">
        <h1 className="text-3xl font-bold text-slate-800 text-center">
          Forgot Password?
        </h1>

        <p className="text-slate-500 text-center mt-3 mb-8">
          Enter your registered email address.
        </p>

        {sent ? (
          <div className="text-center">
            <p className="text-green-600 bg-green-50 p-4 rounded-xl">
              If an account exists for this email, a password reset link will be
              sent. Please check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Sending..." : "Continue"}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link
            href="/signin"
            className="text-blue-600 font-semibold hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
