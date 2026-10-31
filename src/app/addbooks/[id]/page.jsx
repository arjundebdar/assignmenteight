import React from "react";

const BooksDetails = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <h2>Book id is :{id}</h2>
    </div>
  );
};

export default BooksDetails;
