import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    // Validate input meets a specific schema
    .input(z.object({ text: z.string() }))
    // Queries will run when the page is loaded
    // see dan-post.tsx for an example of how to use this
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    // Validate input meets a specific schema
    .input(z.object({ title: z.string().min(1) }))
    // Mutations will run when the function "mutate"
    // or "mutateAsync" is called from a page
    // see dan-post.tsx for an example of how to use this
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getUserBookes: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (user == null) {
        throw new Error("user not found");
      }

      const books = ctx.db.book.findMany({
        where: {
          userBooks: {
            every: {
              User_id: user.id,
            },
          },
        },
      });

      return books;
    }),

    get: publicProcedure
    .input(
      z.object({
        user: z.string(),
      })
    )
    .mutation(async ({ctx, input})) => {
      const newUser = await ctx.db.newUser.create({
        where: {
          name: input.name,
        },
        if (newUser == push) {
          throw new Error ("user cannot be added.");
        }
        const newUserId = ctx.db.newUserId.create({
          
        })
      })
    }
});
