import { useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AddUserForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
    info: "",
  });
  const [response, setResponse] = useState(null);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

    const data = await response.json();
    setResponse(data);
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
        />
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
        />
        <br />
        <button className="l_submit" type="submit">
          Submit
        </button>
      </form>
      {response ? (
        <div>
          <h2>Response:</h2>
          <p>{JSON.stringify(response)}</p>
        </div>
      ) : (
        <p>Waiting for response...</p>
      )}
    </div>
  );
};

export default AddUserForm;
