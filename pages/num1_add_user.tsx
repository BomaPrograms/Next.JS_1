import { useState } from "react";
import { useRouter } from "next/router";

const AddUser: React.FC = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [age, setAge] = useState(0);
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [bookName, setBookName] = useState("");
  const router = useRouter();
  const [response, setResponse] = useState<{ message: string } | null>(null);

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
          id,
          dob,
          age,
          email,
          bookName,
        }),
      });

      const responseData = await res.json();
      setResponse(responseData);

      if (res.ok) {
        alert(responseData.message);
        router.push(`/users/${responseData.id}`);
      } else {
        console.error(responseData);
        alert("An error occurred while adding the user: " + responseData.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the user.");
    }
  };
 
  const calculateAge = (dob: string) => {
    const dobDate = new Date(dob);
    const ageDiff = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Id:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(parseInt(e.target.value))}
          />
        </label>
        <br />
        <br />
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
          Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              setAge(calculateAge(e.target.value));
            }}
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

export default AddUser;
