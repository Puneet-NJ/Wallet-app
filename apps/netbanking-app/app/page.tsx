"use client";
import jwt from "jsonwebtoken";
import { useParams, useSearchParams } from "next/navigation";

export default function Home() {
	const params = useSearchParams();
	const token = params.get("token") || "";

	let verifyToken;
	try {
		console.log(token);

		// verifyToken = jwt.verify(token, process.env.JWT_PASSWORD || "secret");
		// verifyToken = jwt.decode(token);
		verifyToken = jwt.verify(token, "secret");
		console.log(verifyToken);
	} catch (err) {
		console.log(err);
	}

	console.log(JSON.stringify(verifyToken));

	return (
		<div className="">
			<form>
				<h1>Net Banking App</h1>

				{/* <p>A debit of ₹{JSON.stringify(verifyToken)}</p> */}
			</form>
		</div>
	);
}
