"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { resetPassword } from "@/lib/auth-client";

const ResetPassword = () => {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Invalid or expired reset link");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const { error } = await resetPassword({
        newPassword: password,
        token,
      });

      if (error) throw new Error(error.message);

      toast.success("Password changed successfully!");

      router.push("/signin");
    } catch (error) {
      toast.error(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex justify-center items-center px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">
        <h1 className="text-3xl font-bold text-slate-800 text-center">
          Create New Password
        </h1>

        <p className="text-slate-500 text-center mt-3 mb-8">
          Enter and confirm your new password.
        </p>

        {!token ? (
          <p className="text-center text-rose-500">
            Invalid or expired reset link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                minLength={8}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                minLength={8}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
