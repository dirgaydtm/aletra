import { z } from "zod";

export const authUserSchema = z.object({
	id: z.string(),
	email: z.string(),
	username: z.string(),
	loggedInAt: z.number(),
});

export type AuthUser = z.infer<typeof authUserSchema>;
