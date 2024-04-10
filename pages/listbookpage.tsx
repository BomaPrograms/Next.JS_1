// listbookspage.tsx

import React from "react";
import { api } from "../utils/api";

const ListBooksPage: React.FC = () => {
  
  const Query = api.post.listBook.useQuery();

  const link = document.getElementById("myLink");

  if (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior of the link
      window.location.href = "editbookspage.tsx"; // Redirect the user to another page
    });
  }

  return (
    <div>
      <h1>All Books</h1>
      {Query.data?.map((book) => (
        <div key={book.id}>
          <h3>{book.name}</h3>
          {}
        </div>
      ))}
    </div>
  );
};

  

export default ListBooksPage;
