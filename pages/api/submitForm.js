// Import the necessary modules
const http = require("http");

// Define the API route handler function
export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === "POST") {
    // Create an HTTP server to handle the request
    const server = http.createServer((req, res) => {
      // Log the request body to the console
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        console.log("Form data:", JSON.parse(body));

        // Send a success response
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Form submitted successfully." }));
      });
    });

    // Listen for requests on a random port
    const port = Math.floor(Math.random() * 65536);
    server.listen(port, () => {
      // Send the request to the HTTP server
      req.pipe(server);
    });
  } else {
    // Send a failure response for non-POST requests
    res.status(405).json({ message: "Method not allowed." });
  }
}
