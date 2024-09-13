import AddMoneyCard from "components/AddMoneyCard";

export default function () {
	return (
		<div className="py-10 px-10 w-full">
			<h1 className="text-4xl font-semibold text-blue-600">Add Money</h1>

			<div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
				<div>
					<AddMoneyCard />
				</div>
				<div>
					{/* <BalanceCard amount={balance.amount} locked={balance.locked} />
					<div className="pt-4">
						<OnRampTransactions transactions={transactions} />
					</div> */}
				</div>
			</div>
		</div>
	);
}
