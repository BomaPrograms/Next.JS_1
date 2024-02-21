import fs from 'fs';

// Define the API route handler function
export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === "POST") {
    // Send a response to the client
    res.status(200).json({ message: "Form submitted successfully." });
  } else {
    // Send a failure response for non-POST requests
    res.status(405).json({ message: "Method not allowed." });
  }
}

const formData = JSON.stringify(newForm, null, 2);

fs.writeFile("form-data.json", formData, (err) => {
  if (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to write form data to file." });
  } else {
    console.log("Form data written to form-data.json");
    res.status(200).json(newForm);
  }
});