import prisma from "@repo/db/client";
import { walletpeSchema } from "@repo/zod/client";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

interface VerifiedToken {
	userId: number;
	amount: number;
	iat: number;
	bankToken: string;
}

app.post("/", async (req, res) => {
	try {
		if (!req.headers.authorization || !process.env.JWT_PASSWORD)
			return res.status(411).json({
				msg: "Invalid credentials",
			});

		let token;
		try {
			token = jwt.verify(
				req.headers.authorization?.split(" ")[1] || "",
				process.env.JWT_PASSWORD
			) as VerifiedToken;
		} catch (err) {
			return res.status(411).json({ msg: "Incorrect token" });
		}

		const body = {
			userId: token.userId,
			amount: token.amount,
			token: token.bankToken,
		};
		const validateInput = walletpeSchema.safeParse(body);
		if (!validateInput.success) {
			return res.status(411).json({ msg: "Invalid inputs" });
		}

		const transaction = await prisma.onRampTransactions.findFirst({
			where: {
				token: body.token,
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
						userId: body.userId,
					},
					data: {
						amount: {
							increment: body.amount * 100,
						},
					},
				}),

				prisma.onRampTransactions.update({
					where: {
						token: body.token,
					},
					data: {
						status: "Success",
					},
				}),
			]);

			return res.json({ msg: "Funds added successfully" });
		} catch (err) {
			return res
				.status(403)
				.json({ msg: "Invalid userId or Error while updating database" });
		}
	} catch (err) {
		return res.status(500).json({ msg: "Error" });
	}
});

app.listen(3005);
