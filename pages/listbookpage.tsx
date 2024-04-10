// ListBooksPage.tsx

import React from "react";
import { api } from "../utils/api";

const ListBooksPage: React.FC = () => {
  
  const Query = api.post.getLatest.useQuery();
  const { data: books = [] } = useQuery(["books.list"], {
    async resolve() {
      return await api.query.listBooks();
    },
  });

  return (
    <div>
      <h1>All Books</h1>
      {books.map((book) => (
        <div key={book.bookId}>
          <h3>{book.bookName}</h3>
          {/* Add more book details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ListBooksPage;
