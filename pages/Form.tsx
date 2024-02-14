import React, { useState } from "react";


const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
    info: "",
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
      setForm({ name: "", age: "", dob: "", email: "", info: "" });
      setEmailError("");
    } else {
      alert("Failed to submit form.");
    }
  };
  return (
    <div className="parent">
      <h1 className="headford">FORM APPLICATION</h1>
      <div className="container">
        <div className="container1">
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
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <br />
            <br />

            <button className="l_submit" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="container2">
          <div>
              <br />
              NISHTHA APPLICATION FORM.
              <br />
              By applying to this form,
              <br />
              You have joined the
              <br />
              Nishtha Business Enterprises.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
