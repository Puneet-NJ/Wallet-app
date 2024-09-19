import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export const GET = async () => {
	const data = await prisma.user.findMany({});
	return NextResponse.json({
		data,
	});
};
