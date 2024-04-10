//1st One
// import React, { useState } from "react";
// import { api } from "../utils/api";

// const UserBook = () => {
//   const mutation = api.post.userBook.useMutation();

//   const [userBook, setUserBook] = useState({
//     user_Id: 0,
//     book_Id: 0,
//   });

//   const handleInputChange = (e: { target: { name: any; value: any } }) => {
//     const { name, value } = e.target;
//     setUserBook({ ...userBook, [name]: value });
//   };

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     try {
//       const { data, error } = await mutation.mutateAsync({
//         User_id: Number(userBook.user_Id),
//         Book_id: Number(userBook.book_Id),
//       });

//       if (error) {
//         console.error("Error making userbook:", error);
//       } else if (data) {
//         console.log("UserBook made successfully:", data);
//         // Optionally update UI with the newly added book
//       }
//     } catch (err) {
//       console.error("Something went wrong:", err);
//     }
//   };

//   return (
//     <div>
//       <h1>Create New Book</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           User Id:
//           <input
//             type="number"
//             name="user_Id"
//             value={userBook.user_Id}
//             onChange={handleInputChange}
//             placeholder="User Id"
//           />
//         </label>
//         <br />
//         <br />
//         <label>
//           Book Id:
//           <input
//             type="number"
//             name="book_Id"
//             value={userBook.book_Id}
//             onChange={handleInputChange}
//             placeholder="Book Id"
//           />
//         </label>
//         <br />
//         <br />
//         <button type="submit">Create UserBook</button>
//       </form>
//     </div>
//   );
// };

// export default UserBook;



//2nd One
import React, { useState } from "react";
import { api } from "../utils/api";

const UserBook = () => {
  const mutation = api.post.userBook.useMutation();

  const [userBook, setUserBook] = useState({
    user_Id: 0,
    book_Id: 0,
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserBook({ ...userBook, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await mutation.mutateAsync({
        User_id: Number(userBook.user_Id),
        Book_id: Number(userBook.book_Id),
      });

      if ("error" in result) {
        console.error("Error making userbook:", result.error);
      } else if ("data" in result) {
        console.log("UserBook made successfully:", result.data);
        // Optionally update UI with the newly added book
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  return (
    <div>
      <h1>Join User and Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Id:
          <input
            type="number"
            name="user_Id"
            value={userBook.user_Id}
            onChange={handleInputChange}
            placeholder="User Id"
          />
        </label>
        <br />
        <br />
        <label>
          Book Id:
          <input
            type="number"
            name="book_Id"
            value={userBook.book_Id}
            onChange={handleInputChange}
            placeholder="Book Id"
          />
        </label>
        <br />
        <br />
        <button type="submit">Create UserBook</button>
      </form>
    </div>
  );
};

export default UserBook;