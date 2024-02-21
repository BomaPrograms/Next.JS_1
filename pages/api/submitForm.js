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
