import prisma from "@repo/db/client";
import { walletpeSchema } from "@repo/zod/client";
import express, { Request } from "express";

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
	const validateInput = walletpeSchema.safeParse(req.body);
	if (!validateInput.success) {
		return res.status(411).json({ msg: "Invalid inputs" });
	}

	try {
		await prisma.$transaction([
			prisma.balance.update({
				where: {
					userId: req.body.userId,
				},
				data: {
					amount: {
						increment: req.body.amount,
					},
				},
			}),

			prisma.onRampTransactions.update({
				where: {
					token: req.body.token,
				},
				data: {
					status: "Success",
				},
			}),
		]);

		res.json({ msg: "Funds added successfully" });
	} catch (err) {
		res
			.status(403)
			.json({ msg: "Invalid userId or Error while updating database" });
	}
});

app.listen(3005);
