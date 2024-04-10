import React, { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";

const BookDetails = () => {
  const mutation = api.post.editBook.useMutation();
  const router = useRouter();
  const bookId = router.query.bookId as string;
  const [bookName, setBookName] = useState(""); // State to store the book name entered by user
  const [newBookName, setNewBookName] = useState(""); // State to store the new book name entered by user

  const handleUpdateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await mutation.mutateAsync({
        bookId,
        bookName: newBookName,
      });

      if (result && "error" in result) {
        console.error("Error updating book:", result.error);
      } else if (result) {
        console.log("Book updated successfully:", result.data);
        router.push("/BookList");
      } else {
        console.error("Something went wrong: Result is null or undefined");
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.push("/ListBooksPage"); // Use router.push to navigate to ListBooksPage
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <form onSubmit={handleUpdateBook}>
        <label>
          Current Book Name:
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            disabled // Disable editing of current book name
          />
        </label>
        <label>
          Enter new book name:
          <input
            type="text"
            placeholder="Enter new book name"
            value={newBookName}
            onChange={(e) => setNewBookName(e.target.value)}
          />
        </label>
        <button type="submit">Update Book</button>
      </form>
      <br />
      <br />
      <button>
        <a href="#" onClick={handleLinkClick}>
          Go to List Of Books Page
        </a>
      </button>
    </div>
  );
};

export default BookDetails;
