import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface IFormData {
  name: string;
  age: number;
  dob: string;
  email: string;
  info: string;
}

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, age, dob, email, info } = req.body as IFormData;

    const prisma = new PrismaClient();

    const user = await prisma.user.create({
      data: {
        name,
        age,
        dob: new Date(dob),
        email,
        info,
      },
    });

    res.status(200).json({ message: "User added successfully", user });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
