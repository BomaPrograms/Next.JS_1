import React, { useState, useEffect } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Form: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [emailError, setEmailError] = useState("");
  const [response, setResponse] = useState<{ message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (e.target.name === "email" && !EMAIL_REGEX.test(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const data = await response.json();
    setResponse(data);
  };

  return (
    <div className="contain">
      <h1 className="headies">USER EMAIL FORM</h1>
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
          placeholder="Type email here"
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <br />
        <br />
        <button className="l_submit" type="submit">
          Search
        </button>
      </form>
      {response ? (
        <div>
          <h2>Response:</h2>
          <p>{response.message}</p>
        </div>
      ) : (
        <p>Waiting for response...</p>
      )}
    </div>
  );
};

export default Form;
