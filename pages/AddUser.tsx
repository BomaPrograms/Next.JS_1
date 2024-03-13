import { useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AddUser: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create a new book if it doesn't exist
      const book = await prisma.book.upsert({
        where: { name: bookName },
        update: {},
        create: { name: bookName },
      });

      // Create a new user with the selected book
      const newUser = await prisma.user.create({
        data: {
          name,
          age: parseInt(age),
          dob: new Date(dob),
          email,
          info,
          user_books: {
            create: {
              books: {
                connect: { id: book.id },
              },
            },
          },
        },
      });

      // Display a success message
      alert(`User "${newUser.name}" has been added.`);

      // Redirect to the newly created user's page
      router.push(`/users/${newUser.id}`);
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the user.");
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Info:
          <textarea value={info} onChange={(e) => setInfo(e.target.value)} />
        </label>
        <br />
        <br />
        <label>
          Book ID:
          <input
            type="number"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Book Name:
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;