import { useState, useEffect } from "react";

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
  const [response, setResponse] = useState<string | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBookChange = (e: { target: { value: any } }) => {
    setForm({ ...form, book: e.target.value });
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
        <div>
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
          {books.map((book) => (
            <option key={book.id} value={book.name}>
              {book.name}
            </option>
          ))}
        </div>
        <br />
        <br />
        <button className="l_submit" type="submit">
          Submit
        </button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default EmailForm;
