import { Card } from "@repo/ui/card";

export default function ({
	amount,
	lockedAmount,
}: {
	amount: number;
	lockedAmount?: number;
}) {
	return (
		<Card title="Balance">
			<div className="flex justify-between mx-5 py-3 border-b">
				<span>Unlocked Balance</span>
				<span>₹{amount}</span>
			</div>

			<div className="flex justify-between mx-5 py-3 border-b">
				<span>Locked Balance</span>
				<span>₹0</span>
			</div>

			<div className="flex justify-between mx-5 py-3 border-b font-bold">
				<span>Total Balance</span>
				<span className="text-green-500">₹{amount}</span>
			</div>
		</Card>
	);
}
