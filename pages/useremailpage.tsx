import { api } from "@/utils/api";
import { UserBook, userEmail } from "@prisma/client";
import React, { useState } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserEmail = () => {
  const mutation = api.post.userEmail.useMutation();
  const [userEmailError, setUserEmailError] = useState("");
  const [userEmail, setUserEmail] = useState({
    id: 0,
    email: "",
  });
  const [response, setResponse] = useState<userEmail | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserEmail({ ...userEmail, [name]: value });

    if (e.target.name === "email" && !EMAIL_REGEX.test(e.target.value)) {
      setUserEmailError("Please enter a valid email address.");
    } else {
      setUserEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await mutation.mutateAsync({
        Id: Number(userEmail.id),
        Email: userEmail.email,
      });

      if (result === null) {console.error("Email not found!",)}
      else {
        console.log("User-Email found:", result);
        setResponse(result);
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  return (
    <div>
      <h1>Find User By Email</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Id:
          <input
            type="number"
            name="id"
            value={userEmail.id}
            onChange={handleInputChange}
            placeholder="Id"
          />
        </label>
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
          value={userEmail.email}
          onChange={handleInputChange}
          placeholder="Type email here"
        />
        {userEmailError && <p style={{ color: "red" }}>{userEmailError}</p>}
        <br />
        <br />
        <button className="l_submit" type="submit">
          Search
        </button>
      </form>
      {response ? (
        <div>
          <h2>Response:</h2>
          <p>{response.email}</p>
        </div>
      ) : (
        <p>Waiting for response...</p>
      )}
    </div>
  );
};

export default UserEmail;
