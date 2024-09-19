"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { InputBox } from "@repo/ui/input-box";
import p2pTransfer from "actions/p2pTransfer";
import { useState } from "react";

export default function () {
	const [phone, setPhone] = useState<number>();
	const [amount, setAmount] = useState<number>();

	const handleSendMoney = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		if (!phone || !amount) return;

		const transfer = await p2pTransfer(phone, amount);

		// setAmount(undefined);
		// setPhone(undefined);
	};

	return (
		<Card title="Send Money">
			<form className="flex flex-col gap-4 py-5">
				<InputBox
					id="number"
					placeholder="1111111111"
					type="number"
					min={"1000000000"}
					onChange={(e) => {
						setPhone(Number(e.target.value));
					}}
				/>

				<InputBox
					id="amount"
					placeholder="200"
					type="number"
					min={"1"}
					onChange={(e) => {
						setAmount(Number(e.target.value));
					}}
				/>

				<div className="mt-3 px-[20%]">
					<Button onClick={handleSendMoney}>Send</Button>
				</div>
			</form>
		</Card>
	);
}
