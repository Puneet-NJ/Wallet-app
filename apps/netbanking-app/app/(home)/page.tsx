"use client";

import { useSearchParams } from "next/navigation";
import { InputBox } from "@repo/ui/input-box";
import { Button } from "@repo/ui/button";
import axios from "axios";
import { Suspense } from "react";

function PaymentForm({ token }: { token: string | null }) {
	// handleMakePayment function
	const handleMakePayment = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const res = await axios({
			url: "http://localhost:3003/api/",
			method: "POST",
			data: {
				token,
			},
		});

		if (res.status === 200)
			alert(
				JSON.stringify(res.data.msg) +
					". You can now go back to the original website"
			);
		else alert("Something went wrong!!");

		window.close();
	};

	return (
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
	);
}

function TokenLoader() {
	const params = useSearchParams();
	const token = params.get("token");

	return <PaymentForm token={token} />;
}

export default function Home() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="flex justify-center items-center h-screen bg-gray-100">
				<div className="absolute top-0 w-full text-center shadow-lg border border-b-slate-300 bg-white">
					<h1 className="text-xl font-medium py-7">
						Welcome to WalletPe Bank NetBanking
					</h1>
				</div>

				{/* Suspense now wraps only TokenLoader, which uses the hook */}
				<TokenLoader />
			</div>
		</Suspense>
	);
}
