// import fs from "fs";

// // Define the API route handler function
// export default async function handler(req, res) {
//   // Check if the request method is POST
//   if (req.method === "POST") {
//     // Send a response to the client
//     res.status(200).json({ message: "Form submitted successfully." });

//     // Define the form data
//     const formData = JSON.stringify(req.body, null, 2);

//     // Write the form data to a file
//     fs.appendFile("form-data.json", formData, (err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to write form data to file." });
//       } else {
//         console.log("Form data written to form-data.json");
//       }
//     });
//   } else {
//     // Send a failure response for non-POST requests
//     res.status(405).json({ message: "Method not allowed." });
//   }
// }

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const formData = {
  name: req.body.name,
  age: parseInt(req.body.age),
  dob: new Date(req.body.dob),
  email: req.body.email,
  info: req.body.info,
};

try {
  const newForm = await prisma.form.create({
    data: formData,
  });

  res.status(200).json(newForm);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Failed to write form data to database." });
}