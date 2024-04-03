import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const addUserRouter = createTRPCRouter ({
    addUser: publicProcedure.query (({ctx}) => {
        ctx.db.user;
        return {
            data: {
                name: "",
                dob: "",
                age: "",
                email: "",
                bookName: "",
            },
        };
    }),
});
