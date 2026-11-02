import React, { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import AddBookForm from "./AddBookForm";

const AddBookPage = async () => {
  // Wait for an incoming request
  await connection();

  // Check User Session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Private Route
  if (!session?.user) {
    redirect("/signin?callbackURL=/addbooks");
  }

  return <AddBookForm />;
};

export default function Page() {
  return (
    <Suspense>
      <AddBookPage />
    </Suspense>
  );
}
