"use server";

import prisma from "@repo/db/client";

export default async function (
	token: string,
	provider: string,
	amount: number,
	userId: number
) {
	try {
		const transaction = await prisma.onRampTransactions.create({
			data: {
				token,
				status: "Processing",
				provider,
				startDate: new Date(),
				amount: amount * 100,
				userId,
			},
		});

		return { msg: "Initiated transaction" };
	} catch (err) {
		console.log(err);
	}
}
