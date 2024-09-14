import { Card } from "@repo/ui/card";

interface Props {
	transactions: {
		id: number;
		status: "Success" | "Failure" | "Processing";
		startDate: Date;
		amount: number;
	}[];
}

export default function ({ transactions }: Props) {
	return (
		<Card title="Recent Transactions">
			<div>
				{transactions.map((txn: any) => (
					<div
						key={txn.id}
						className="flex justify-between items-center border-b py-2 mx-5"
					>
						<div>
							<div className="font-medium">{txn.status}</div>
							<div className="text-xs text-gray-600">
								{txn.startDate.toString().split(" GMT")[0]}
							</div>
						</div>

						<div className="font-medium">₹{txn.amount}</div>
					</div>
				))}
			</div>
		</Card>
	);
}
