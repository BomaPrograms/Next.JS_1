import React, { useState } from "react";
// import styles from 

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
  });

  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "email" && !EMAIL_REGEX.test(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Validate form fields
    if (!form.name || !form.age || !form.dob || !form.email) {
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
      setForm({ name: "", age: "", dob: "", email: "" });
      setEmailError("");
    } else {
      alert("Failed to submit form.");
    }
  };

  return (
    <div>
      <h1>FORM APPLICATION</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
