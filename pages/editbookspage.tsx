// pages/BookDetails.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
// import { AppRouter } from "../server/trpc/root";

const BookDetails = () => {
  const mutation = api.book.updateBook.useMutation();
  const router = useRouter();
  const bookId = router.query.bookId as string;
  const [newBookName, setNewBookName] = useState("");

  const handleUpdateBook = async () => {
    try {
      const result = await mutation.mutateAsync({
        bookId,
        bookName: newBookName,
      });
      if ("error" in result) {
        console.error("Error updating book:", result.error);
      } else {
        console.log("Book updated successfully:", result.data);
        router.push("/BookList");
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <input
        type="text"
        placeholder="Enter new book name"
        value={newBookName}
        onChange={(e) => setNewBookName(e.target.value)}
      />
      <button onClick={handleUpdateBook}>Update Book</button>
    </div>
  );
};

export default BookDetails;
