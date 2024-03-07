import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, age, dob, email, info, bookId } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        age: parseInt(age),
        dob: new Date(dob),
        email,
        info,
        user_books: {
          create: {
            books_id: parseInt(bookId),
          },
        },
      },
    });

    res.status(200).json(newUser);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

