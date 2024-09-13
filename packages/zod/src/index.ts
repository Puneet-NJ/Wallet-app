import zod from "zod";

export const userSchema = zod.object({
	phone: zod.string().length(10),
	password: zod.string().min(3),
});

export const sendMoneySchema = zod.object({
	userId: zod.number(),
	amount: zod.number().min(1), // made sure user cannot send -ve amount
});

export const walletpeSchema = zod.object({
	userId: zod.number(),
	amount: zod.number().min(1),
	token: zod.string(),
});
