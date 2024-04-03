import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
  
  const book = api.post.newBook.useMutation();

const newBook = () => {

  const [books, setBooks] = useState({
    bookId: "",
    bookName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooks({ ...books, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await newBook.mutateAsync({
      bookId: books.bookId,
      bookName: books.bookName,
    });
    console.log(data);
  };

  return (
    <div>
      <h1>Create New Book</h1>
      <form onSubmit={handleSubmit}>
        <label className="l_bookId">
          Book Id:
          <input
            className="i_bookId"
            type="number"
            name="bookId"
            value={books.bookId}
            onChange={handleInputChange}
            placeholder="Book Id"
          />
        </label>
        <br />
        <br />
        <label className="l_bookName">
          Book Name:
          <input
            className="i_bookName"
            type="text"
            name="bookName"
            value={books.bookName}
            onChange={handleInputChange}
            placeholder="Book Name"
          />
        </label>
      </form>
    </div>
  );
};

export default newBook;