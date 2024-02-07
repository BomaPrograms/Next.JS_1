// Define the API route handler function
export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === "POST") {
    // Send a response to the client
    res.status(200).json({ message: "Form submitted successfully." }));
  } else {
    // Send a failure response for non-POST requests
    res.status(405).json({ message: "Method not allowed." });
  }
}
