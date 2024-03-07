import { useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ResponseType = {
  message: string;
};

interface IBook {
  id: number;
  name: string;
}

const EmailForm = () => {
  const [form, setForm] = useState<any>({
    name: "",
    age: "",
    dob: "",
    email: "",
    info: "",
    book: "",
  });
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBookChange = (e: { target: { value: any } }) => {
    setForm({ ...form, book: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const data = await response.json();
      setResponse({ message: data.message });
    } else {
      setResponse({ message: "An error occurred while submitting the form." });
    }
  };

  // Fetch books data from the server and set it to the books state
  const fetchBooks = async () => {
    const response = await fetch("/api/books");
    const data = await response.json();
    setBooks(data);
  };

  return (
    <div className="contain">
      <h1 className="headies">ADD USER FORM</h1>
      <form onSubmit={handleSubmit}>
        <label className="l_name" htmlFor="name">
          Name:
        </label>
        <br />
        <input
          className="i_name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <br />
        <br />
        <label className="l_age" htmlFor="age">
          Age:
        </label>
        <br />
        <input
          className="i_age"
          type="number"
          name="age"
          value={form.age}
          onChange={handleInputChange}
          placeholder="How old are you ?"
        />
        <br />
        <br />
        <label className="l_dob" htmlFor="dob">
          Date of Birth:
        </label>
        <br />
        <input
          className="i_dob"
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label className="l_email" htmlFor="email">
          Email:
        </label>
        <br />
        <input
          className="i_email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="Type email here"
        />
        <br />
        <br />
        <label className="l_info" htmlFor="info">
          Info:
        </label>
        <br />
        <textarea
          className="i_info"
          name="info"
          value={form.info}
          onChange={handleInputChange}
          placeholder="Type something you want to tell us"
        />
        <br />
        <br />
        <label className="l_book" htmlFor="book">
          Book:
        </label>
        <br />
        <input
          className="i_book"
          type="text"
          name="book"
          value={form.book}
          onChange={handleInputChange}
          placeholder="Enter a book name"
        />
        <br />
        <br />
        <button className="l_submit" type="submit">
          Submit
        </button>
      </form>
      {response && <p>{response.message}</p>}
    </div>
  );
};

export default EmailForm;