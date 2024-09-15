"use server";

import prisma from "@repo/db/client";
import { authOptions } from "lib/auth";
import { getServerSession } from "next-auth";

export default async function (phone: number, amount: number) {
	const session = await getServerSession(authOptions);
	const fromUser = session?.user.id;

	if (amount < 1)
		return {
			msg: "Money should be greater than 0",
		};

	const receiver = await prisma.user.findFirst({
		where: {
			phone: String(phone),
		},
	});
	if (!receiver)
		return {
			msg: "No user found by the phone number",
		};

	const toUser = receiver.id;

	const response = await prisma.$transaction(async (tx) => {
		await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`;

		const balance = await tx.balance.findFirst({
			where: {
				userId: Number(fromUser),
			},
		});

		// YOU CAN TRY SIMULATE THAT THE FETCHING BALANCE REQUEST TAKES 4SEC THEN
		// YOU WILL ENCOUNTER AN ERROR THAT WHEN TO SIMALTANOUS REQUESTS COME
		// BOTH WILL HAVE THE SAME BALANCE WHICH ISN'T IDEAL. HENCE LOCKING
		// await new Promise((res) => setTimeout(res, 2000));

		if (balance && balance?.amount < amount)
			return {
				msg: "Not sufficient funds",
			};

		await tx.balance.update({
			where: {
				userId: Number(fromUser),
			},
			data: {
				amount: {
					decrement: amount * 100,
				},
			},
		});

		await tx.balance.update({
			where: {
				userId: toUser,
			},
			data: {
				amount: {
					increment: amount * 100,
				},
			},
		});

		await tx.p2pTransfers.create({
			data: {
				amount: amount * 100,
				time: new Date(),
				fromId: Number(fromUser),
				toId: toUser,
			},
		});

		return {
			msg: "Transfer succesful",
		};
	});

	return response;
}
