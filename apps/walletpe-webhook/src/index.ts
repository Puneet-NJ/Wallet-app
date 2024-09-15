import prisma from "@repo/db/client";
import { walletpeSchema } from "@repo/zod/client";
import express, { Request } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
	const validateInput = walletpeSchema.safeParse(req.body);
	if (!validateInput.success) {
		return res.status(411).json({ msg: "Invalid inputs" });
	}

	const transaction = await prisma.onRampTransactions.findFirst({
		where: {
			token: req.body.token,
		},
	});

	if (transaction?.status !== "Processing")
		return res
			.status(411)
			.json({ msg: "Transaction already succeded or failed" });

	try {
		await prisma.$transaction([
			prisma.balance.update({
				where: {
					userId: req.body.userId,
				},
				data: {
					amount: {
						increment: req.body.amount * 100,
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

		console.log(err);
	}
});

app.listen(3005);
