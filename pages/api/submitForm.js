import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, age, dob, email, info } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          age,
          dob,
          email,
          info,
        },
      });
      res.status(200).json({ message: "Form submitted successfully.", user });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit form." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
