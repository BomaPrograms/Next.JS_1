import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface IFormData {
  name: string;
  age: number;
  dob: string;
  email: string;
  info: string;
  book: string; // Update the book field to be string
}

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, age, dob, email, info, book } = req.body as IFormData;

    if (!book) {
      return res.status(400).json({ message: "Please select a book" });
    }

    const prisma = new PrismaClient();

    const newBook = await prisma.books.create({
      data: {
        name: book,
      },
    });

    const user = await prisma.user.create({
      data: {
        name,
        age,
        dob: new Date(dob),
        email,
        info,
        user_books: {
          create: {
            books_id: newBook.id,
          },
        },
      },
    });

    res.status(200).json({ message: "User added successfully", user });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
