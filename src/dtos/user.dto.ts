import z from "zod";
import { UserSchema } from "../types/user.type";

export const createUserDto = UserSchema.pick( // reuse schema
    {
        username: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
    }
).extend( // add new attribute to schema
    {
        confirmPassword: z.string().min(6),
    }
).refine( // custom validation
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export type CreateUserDto = z.infer<typeof createUserDto>;