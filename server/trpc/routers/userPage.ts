import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userPageRouter = createTRPCRouter ({
    getUserPage: publicProcedure.query (({ctx}) => {
        ctx.db.user;
        return {
            data: {
                id: "",
                name: "",
                dob: "",
                age: "",
                email: "",
            },
        };
    }),
});
