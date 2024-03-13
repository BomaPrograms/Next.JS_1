// 1st Form submission handling using fs module
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

//2nd Form submission handling using Prisma ORM
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function handleFormSubmission(req: { method: string; body: { name: any; age: string; dob: string | number | Date; email: any; info: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; id?: number; name?: string; age?: number; dob?: Date; email?: string; info?: string | null; error?: string; }): void; new(): any; }; }; }) {
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
// // export default handleFormSubmission;

// //3rd Form submission handling with Next.js and Prisma ORM
// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// interface IFormData {
//   email: string;
// }

// export default async function submitForm(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const formData: IFormData = req.body;

//     const prisma = new PrismaClient();

//     const user = await prisma.user.findUnique({
//       where: {
//         email: formData.email,
//       },
//       include: {
//         userBooks: {
//           include: {
//             Book: true,
//           },
//         },
//       },
//     });

//     if (user) {
//       const books = user.userBooks.map((Book) => Book.Book.name);
//       const bookString = books.length > 0 ? books.join(", ") : "none";

//       res.status(200).json({
//         message: `Email: ${user.email}, Books: ${bookString}`,
//       });
//     } else {
//       res.status(404).json({
//         message: "User does not exist",
//       });
//     }

//     await prisma.$disconnect();
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }

//4th
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IFormData {
  bookId: any;
  name: string;
  age: string;
  dob: string;
  email: string;
  bookName: string;
}

export default async function submitForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData: IFormData = req.body;

    try {
      // Create a new book if it doesn't exist
      const book = await prisma.book.upsert({
        where: { id: formData.bookId },
        update: {},
        create: { name: formData.bookName },
      });

      // Create a new user with the selected book
      const newUser = await prisma.user.create({
        data: {
          name: formData.name,
          age: parseInt(formData.age),
          dob: new Date(formData.dob),
          email: formData.email,
          userBooks: {
            create: {
              Book: {
                connect: { id: book.id },
              },
            },
          },
        },
      });

      res.status(200).json({
        message: `User "${newUser.name}" has been added.`,
        id: newUser.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add user." });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}