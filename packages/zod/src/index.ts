import zod from "zod";

export const userSchema = zod.object({
	phone: zod.string().length(10),
	password: zod.string().min(3),
});
