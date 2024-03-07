import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function addUser(req: { method: string; body: { name: any; age: any; dob: any; email: any; info: any; book: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; user?: { id: number; name: string; age: number; dob: Date; email: string; info: string | null; }; }): void; new(): any; }; }; }) {
  if (req.method === "POST") {
    const { name, age, dob, email, info, book } = req.body;

    const newBook = await prisma.books.create({
      data: {
        name: book,
      },
    });

    const user = await prisma.user.create({
      data: {
        name,
        age: parseInt(age),
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
