import { ChangeEvent, useState } from "react";
import { api } from "../utils/api";
import { PrismaClient } from "@prisma/client";

const DanPost: React.FC = () => {
  // This will load the latest posts from the server when
  // the page is loaded. to access the data we do posts.data
  // trpc also handles refetching of the data automatically
  // this is how useQuery works
  const posts = api.post.getLatest.useQuery();

  // useMutation works differently from useQuery
  // useQuery is generally used for fetching data
  // and useMutation is used for updating data
  // or performing other side effects (side effects meaning
  // any action that changes something, i.e updating a database)
  const createPost = api.post.create.useMutation();

  const books = api.post.getUserBooks.useMutation();

  const adduser = api.post.addUser.useMutation();

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [emailError, setEmailError] = useState("");
  const [user, setUser] = useState({
    name: "",
    dob: "",
    age: 0,
    email: "",
    bookName: "",
  });

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await adduser.mutateAsync({
      age: Number(user.age),
      dob: user.dob,
      name: user.name,
      email: user.email,
      bookName: user.bookName
    });
    console.log(data);
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setUser((oldUser) => {
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
      setUser((oldUser) => {
        return { ...oldUser, age: age };
      });
    }
  };

  const calculateAge = (dob: string) => {
    const dobDate = new Date(dob);
    const ageDiff = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>create user</h1>
      <form onSubmit={handleUserSubmit}>
        <label>email</label>
        <input name="email" value={user.email} onChange={handleInputChange} />
        <label className="l_name">
          Name:
          <input
            className="i_name"
            type="text"
            name="name"
            value={user.name}
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
            value={user.dob}
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
            value={user.age}
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
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {emailError && <p>{emailError}</p>}
        </label>
        <label className="l_book">
          Book Name:
          <input
            className="i_book"
            type="text"
            name="bookName"
            value={user.bookName}
            onChange={handleInputChange}
            placeholder="Name of Book"
          />
        </label>
        <br />
        <button type="submit">Create user</button>
      </form>
    </div>
  );
};

export default DanPost;
