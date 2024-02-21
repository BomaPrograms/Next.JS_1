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
// export default handleFormSubmission;












// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function handleFormSubmission(req, res) {
//   // Check if the request method is POST
//   if (req.method === "POST") {
//     // Send a response to the client
//     res.status(200).json({ message: "Form submitted successfully." });
//   } else {
//     // Send a failure response for non-POST requests
//     res.status(405).json({ message: "Method not allowed." });
//   }

//   const formData = {
//     name: req.body.name,
//     age: parseInt(req.body.age),
//     dob: new Date(req.body.dob),
//     email: req.body.email,
//     info: req.body.info,
//   };

//   try {
//     const newForm = await prisma.user.create({
//       data: formData,
//     });

//     res.status(200).json(newForm);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to write form data to database." });
//   }
// }
// export default handleFormSubmission;











// import { PrismaClient } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";

// const prisma = new PrismaClient();

// async function handleFormSubmission(req:NextApiRequest, res:NextApiResponse) {
//   // Check if the request method is POST
//   if (req.method === "POST") {
//     // Get the user's email address from the request body
//     const { email } = req.body as any;

//     // Check if the user has already taken a book
//     const userWithBook = await prisma.user.findUnique({
//       where: { email },
//       include: { user_books:{include: {books: true}} }
//     });

//     console.log(userWithBook)

//     if (userWithBook) {
//       // If the user has already taken a book, send a failure response
//       res.status(400).json({ message: "User has already taken a book." });
//     } else {
//       // If the user hasn't taken a book yet, proceed with the form submission
//       res.send("")
//     }
//   } else {
//     // Send a failure response for non-POST requests
//     res.status(405).json({ message: "Method not allowed." });
//   }
// }

// export default handleFormSubmission;





// // Import necessary types
// import type { NextApiRequest, NextApiResponse } from 'next';

// // Define the type for the request body
// interface IFormData {
//   name: string;
//   age: string;
//   dob: string;
//   email: string;
//   info: string;
// }

// // Define the type for the API route handler
// export default async function submitForm(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Check if the request method is POST
//   if (req.method === 'POST') {
//     // Parse the request body as JSON
//     const formData: IFormData = req.body

//     // Display the user's email and a "book" on the page
//     res.status(200).json({ message: `Email: ${formData.email}, Book: Welcome to Next.js!` })
//   } else {
//     // If the request method is not POST, return a 405 Method Not Allowed error
//     res.setHeader('Allow', 'POST')
//     res.status(405).end('Method Not Allowed')
//   }
// }  





import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// Define the type for the request body
interface IFormData {
  email: string;
}

// Define the type for the API route handler
export default async function submitForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is POST
  if (req.method === "POST") {
    // Parse the request body as JSON
    const formData: IFormData = req.body;

    // Connect to the Prisma database
    const prisma = new PrismaClient();

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email: formData.email,
      },
      include: {
        books: true,
      },
    });

    if (user) {
      // If the user exists, display the user and the books they have taken
      res.status(200).json({
        message: `Email: ${user.email}, Books: ${user.books
          .map((book) => book.title)
          .join(", ")}`,
      });
    } else {
      // If the user does not exist, display a message indicating that the user does not exist
      res.status(404).json({
        message: "User does not exist",
      });
    }

    // Close the Prisma database connection
    await prisma.$disconnect();
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed error
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}