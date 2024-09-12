"use client";
import jwt from "jsonwebtoken";
import { useParams, useSearchParams } from "next/navigation";

export default function Home() {
	const params = useSearchParams();
	const token = params.get("token");

	// Assuming you're using JWT for verification
	// const amount = jwt.verify(token, process.env.JWT_PASSWORD || "secret")

	console.log(token); // This will log "abc"
	console.log(params.toString()); // Log the full query string

	return (
		<div className="">
			<form>
				<h1>Net Banking App</h1>

				<p>A debit of ₹{}</p>
				{JSON.stringify(params)}
			</form>
		</div>
	);
}
