import { useState } from "react";
import { api } from "../utils/api";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const newUser = () => {
  const mutation = api.post.user.useMutation();

  const [emailError, setEmailError] = useState("");
  const [newUser, setNewUser] = useState({
    id: 0,
    name: "",
    dob: "",
    age: 0,
    email: "",
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = await mutation.mutateAsync({
      id: Number(newUser.id),
      age: Number(newUser.age),
      dob: newUser.dob,
      name: newUser.name,
      email: newUser.email,
    });
    console.log(data);
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setNewUser((oldUser) => {
      return { ...oldUser, [e.target.name]: e.target.value };
    });

    if (e.target.name === "email" && !EMAIL_REGEX.test(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (e.target.name === "dob") {
      console.log("dob", e.target.value);
      const age = calculateAge(e.target.value);
      setNewUser((oldUser) => {
        return { ...oldUser, age: age };
      });
    }
  };

  const calculateAge = (dob: string | number | Date) => {
    const dobDate = new Date(dob);
    const ageDiff = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div>
      <h1>create user</h1>
      <form onSubmit={handleSubmit}>
        <label className="l_name">
            Id:
            <input className="i_name"
            type="number"
            name="id"
            value={newUser.id}
            onChange={handleInputChange}
            placeholder="User Id" />
        </label>
        <br />
        <br />
        <label className="l_name">
          Name:
          <input
            className="i_name"
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="What is your Name ?"
          />
        </label>
        <br />
        <br />
        <label className="l_dob">
          Date of Birth:
          <input
            className="i_dob"
            type="date"
            name="dob"
            value={newUser.dob}
            onChange={handleInputChange}
            placeholder="Date of Birth"
          />
        </label>
        <br />
        <br />
        <label className="l_age">
          Age:
          <input
            className="i_age"
            type="number"
            name="age"
            value={newUser.age}
            onChange={handleInputChange}
            placeholder="Age"
          />
        </label>
        <br />
        <br />
        <label className="l_email">
          Email:
          <input
            className="i_email"
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {emailError && <p>{emailError}</p>}
        </label>
        <br />
        <button type="submit">Create user</button>
      </form>
    </div>
  );
};

export default newUser;
