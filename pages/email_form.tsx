import React, { useState } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Form = () => {
  const [form, setForm] = useState({
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
      setForm({ email: ""});
      setEmailError("");
    } else {
      alert("Failed to submit form.");
    }
  };

    return(
  <div className="contain">
    <h1 className="headies">USER EMAIL FORM</h1>
    <div className="con">
        <form onSubmit={handleSubmit}>
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
  </div>
);};

  export default Form;