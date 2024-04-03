import { useState } from "react";
import { useRouter } from "next/router";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    bookName: "",
  });
  const [dob, setDob] = useState("");
  const router = useRouter();
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => { 
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === "email" && !EMAIL_REGEX.test(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (e.target.name === "dob") {
      const age = calculateAge(e.target.value);
      setUser({ ...user, age: age.toString() });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!user.name || !user.age || !user.email || !user.bookName) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!EMAIL_REGEX.test(user.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponse(responseData);
        setUser({
          name: "",
          age: "",
          email: "",
          bookName: "",
        });
        router.push(`/users/${responseData.id}`);
      } else {
        const errorData = await response.json();
        console.error(errorData);
        setResponse({
          message:
            "An error occurred while adding the user: " + errorData.error,
        });
      }
    } catch (error) {
      console.error(error);
      setResponse({ message: "An error occurred while adding the user." });
    }
  };

  const calculateAge = (dob:string) => {
    const dobDate = new Date(dob);
    const ageDiff = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label className="l_name">
          Name:
          <input className="i_name"
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
          <input className="i_dob"
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              const age = calculateAge(e.target.value);
              setUser({ ...user, age: age.toString() });
            }}
            placeholder="Date of Birth"
          />
        </label>
        <br />
        <br />
        <label className="l_age">
          Age:
          <input className="i_age"
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
          <input className="i_email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {emailError && <p>{emailError}</p>}
        </label>
        <br />
        <br />
        <label className="l_book">
          Book Name:
          <input className="i_book"
            type="text"
            name="bookName"
            value={user.bookName}
            onChange={handleInputChange}
            placeholder="Name of Book"
          />
        </label>
        <br />
        <br />
        <button className="l_submit" type="submit">Add User</button>
      </form>
      {response ? (
        <div>
          <h2>Response:</h2>
          <p>{response.message}</p>
        </div>
      ) : (
        <p>Waiting for response...</p>
      )}
      <br />
      <button className="info_submit">
        <a href="">
          Don't want to add a user ? <br /> Search for a user by Email.
        </a>
      </button>
    </div>
  );
};

export default AddUser;
