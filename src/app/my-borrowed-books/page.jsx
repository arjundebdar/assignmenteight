import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import MyBorrowedBooksClient from "./MyBorrowedBooksClient";

const MyBorrowedBooksPage = async () => {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin?callbackURL=/my-borrowed-books");
  }

  return <MyBorrowedBooksClient />;
};

export default MyBorrowedBooksPage;
