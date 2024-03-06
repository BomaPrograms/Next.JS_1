import React, { useState, useEffect } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type UserBooksType = {
  user_books: {
    books: {
      id: number;
      name: string;
    }[];
  }[];
};

const Form = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [emailError, setEmailError] = useState("");
  const [userBooks, setUserBooks] = useState<UserBooksType>({
    user_books: [],
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (e.target.name === "email" && !EMAIL_REGEX.test(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => { e.preventDefault();

  // Validate form fields
  if (!form.email) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!EMAIL_REGEX.test(form.email)) {
    setEmailError("Please enter a valid email address.");
    return;
  }

  // Send form data to API route
  const response = await fetch("/api/submitForm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (response.ok) {
    alert("Form submitted successfully!");
    setForm({ email: "" });
    setEmailError("");
  } else {
    alert("Failed to submit form.");
  }
  };

  useEffect(() => { const fetchUserBooks = async () => { 
  const response = await fetch("/api/userBooks"); 
  const data = await response.json(); setUserBooks(data); };

  fetchUserBooks();
  }, []);

  return (
    <div className="contain">
      {" "}
      <h1 className="headies">USER EMAIL FORM</h1>{" "}
      <div className="con">
        {" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <label className="l_email" htmlFor="email">
            {" "}
            Email:{" "}
          </label>{" "}
          <br />{" "}
          <input
            className="i_email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />{" "}
          {emailError && <p style={{ color: "red" }}>{emailError}</p>} <br />{" "}
          <br />
          <button className="l_submit" type="submit">
            Submit
          </button>
        </form>
        <h2>User Books</h2>
        <ul>
          {userBooks.user_books?.length > 0 && (
            <>
              {userBooks.user_books.map((userBook) => (
                <li key={userBook.books[0].id}>{userBook.books[0].name}</li>
              ))}
            </>
          )}
          {userBooks.user_books?.length === 0 && <p>No books found.</p>}
        </ul>
      </div>
    </div>
  );
};

export default Form;
