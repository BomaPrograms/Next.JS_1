import { useState } from "react";
import { useRouter } from "next/router";

const AddUser: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [bookName, setBookName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          dob,
          email,
          bookName,
        }),
      });

      if (res.ok) {
        const { message, id } = await res.json();
        alert(message);
        router.push(`/users/${id}`);
      } else {
        alert("An error occurred while adding the user.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the user.");
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
        </label>
        <br />
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Book Name:
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
