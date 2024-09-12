import zod from "zod";

export const bodySchema = zod.object({
	userId: zod.number(),
	amount: zod.number().min(1), // made sure user cannot send -ve amount
});
