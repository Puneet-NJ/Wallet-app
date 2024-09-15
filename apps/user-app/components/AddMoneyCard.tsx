"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { InputBox } from "@repo/ui/input-box";
import { SelectInput } from "@repo/ui/select-input";
import onRampTxns from "actions/onRampTxns";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

const banks = [
	{
		name: "HDFC Bank",
		url: "http://localhost:3002/hdfc",
	},
	{
		name: "Axis Bank",
		url: "http://localhost:3002/axis",
	},
];

export default function () {
	const [redirectUrl, setRedirectUrl] = useState(banks[0]?.url);
	const [amount, setAmount] = useState(1);
	const [provider, setProvider] = useState(banks[0]?.name || "HDFC Bank");
	const session = useSession();

	const handleAddMoney = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		if (amount < 1) {
			alert("Amount should be greater than 0");
			return;
		}

		const bankWebhook = await axios({
			method: "POST",
			url: redirectUrl,
			data: {
				userId: Number(session?.data?.user.id),
				amount,
			},
		});

		if (!bankWebhook.data.token) alert("Couldn't hit bank server");

		const onRampTxn = await onRampTxns(
			bankWebhook.data.token,
			provider,
			amount,
			Number(session?.data?.user.id)
		);

		window.open(
			`http://localhost:3003/?token=${bankWebhook.data.token}`,
			"_blank"
		);
	};

	return (
		<Card title="Add Money">
			<form className="flex flex-col gap-4 py-5  border-">
				<InputBox
					placeholder="Amount"
					id="amount"
					type="number"
					min={"1"}
					onChange={(e) => {
						setAmount(Number(e.target.value));
					}}
				/>

				<SelectInput
					label="Bank"
					id="bank"
					options={banks.map((bank) => ({ key: bank.name, value: bank.name }))}
					onChange={(e) => {
						const selectedBank = banks.find(
							(bank) => bank.name === e.target.value
						);

						setRedirectUrl(selectedBank?.url);
						setProvider(selectedBank?.name || "HDFC Bank");
					}}
				/>

				<div className="mt-3 px-40">
					<Button onClick={handleAddMoney}>Add Money</Button>
				</div>
			</form>
		</Card>
	);
}
