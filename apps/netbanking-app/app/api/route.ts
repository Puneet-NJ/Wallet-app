import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface DecodedJWT {
	userId: number;
	amount: number;
	iat: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
	const body = await req.json();

	try {
		const token = jwt.decode(body.token) as DecodedJWT;

		if (!token || !token.userId || !token.amount || !process.env.JWT_PASSWORD)
			return NextResponse.json({ msg: "Insufficient data" }, { status: 403 });

		const walletpeToken = jwt.sign(
			{
				bankToken: body.token,
				userId: token.userId,
				amount: token.amount,
			},
			process.env.JWT_PASSWORD
		);

		const walletpeWebhook = await axios({
			method: "POST",
			url: "http://localhost:3005/",
			headers: {
				Authorization: `Bearer ${walletpeToken}`,
			},
		});

		return NextResponse.json(
			{ msg: walletpeWebhook.data.msg },
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);

		return NextResponse.json({ msg: "Error" }, { status: 411 });
	}
}
