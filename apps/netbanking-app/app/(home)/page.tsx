"use client";

import { useSearchParams } from "next/navigation";
import { InputBox } from "@repo/ui/input-box";
import { Button } from "@repo/ui/button";
import { Appbar } from "@repo/ui/appbar";
import axios from "axios";

export default function () {
	const params = useSearchParams();
	const token = params.get("token");

	// YOU SEE, I DIDN'T DO JWT.DECODE BECAUSE I WAS UNABLE EXTRACT FIELDS FROM
	// IT DUE TO TYPE ERRORS. HENCE, I DID SIMILAR APPROACH OF DECODING IT USING
	// atob FUNCTION
	const handleMakePayment = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const { userId, amount } = JSON.parse(atob(token?.split(".")[1] || ""));

		const walletWebhook = await axios({
			method: "POST",
			url: `http://localhost:3005/`,
			data: {
				userId,
				amount,
				token,
			},
		});

		if (walletWebhook.status === 200)
			alert(
				walletWebhook.data.msg + ". You can now go back to original website"
			);

		window.close();
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className=" absolute top-0 w-full text-center shadow-lg border border-b-slate-300 bg-white">
				<h1 className="text-xl font-medium py-7">
					Welcome to WalletPe Bank NetBanking
				</h1>
			</div>

			<form className="w-1/5 flex flex-col gap-4 border border-slate-300 py-10 px-7 bg-white shadow-xl rounded-md">
				<h1 className="text-2xl font-semibold text-center mb-3">
					Net Banking App
				</h1>

				<div className="flex flex-col gap-4">
					<InputBox
						placeholder="Enter card number"
						id="card"
						type="number"
						onChange={() => {}}
					/>

					<InputBox
						placeholder="Enter cvv number"
						id="CVV"
						type="number"
						onChange={() => {}}
					/>
				</div>

				<div className="flex justify-center items-center mt-3 px-">
					<Button onClick={handleMakePayment}>Make Payment</Button>
				</div>
			</form>
		</div>
	);
}
