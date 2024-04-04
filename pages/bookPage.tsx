import React, { useState } from "react";
import { api } from "../utils/api";

const NewBook = () => {
  const mutation = api.post.newBook.useMutation();

  const [book, setBook] = useState({
    bookId: 0,
    bookName: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const { data, error } = await mutation.mutateAsync({
        bookId: Number(book.bookId),
        bookName: book.bookName,
      });

      if (error) {
        console.error("Error adding book:", error);
      } else if (data) {
        console.log("Book added successfully:", data);
        // Optionally update UI with the newly added book
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  return (
    <div>
      <h1>Create New Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Book Id:
          <input
            type="number"
            name="bookId"
            value={book.bookId}
            onChange={handleInputChange}
            placeholder="Book Id"
          />
        </label>
        <br />
        <br />
        <label>
          Book Name:
          <input
            type="text"
            name="bookName"
            value={book.bookName}
            onChange={handleInputChange}
            placeholder="Book Name"
          />
        </label>
        <br />
        <br />
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default NewBook;
