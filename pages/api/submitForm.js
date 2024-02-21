import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, age, dob, email, info } = req.body;

    try {
      const newForm = await prisma.form.create({
        data: {
          name,
          age,
          dob,
          email,
          info,
        },
      });

      res.status(200).json(newForm);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit form." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
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