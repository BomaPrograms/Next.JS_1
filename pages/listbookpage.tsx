// listbookspage.tsx

import React from "react";
import { api } from "../utils/api";

const ListBooksPage: React.FC = () => {
  
  const Query = api.post.listBook.useQuery();

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    window.location.href = "editbookspage";
  };

  return (
    <div>
      <h1>All Books</h1>
      {Query.data?.map((book) => (
        <div key={book.id}>
          <h3>{book.name}</h3>
          {}
        </div>
      ))}
      <button>
        <a href="#" onClick={handleLinkClick}>
          Go to Edit Books Page
        </a>
      </button>
    </div>
  );
};

  

export default ListBooksPage;
