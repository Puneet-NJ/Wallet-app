import P2pTransfers from "components/P2pTransfers";
import SendMoneyCard from "components/SendMoneyCard";

export default function () {
	return (
		<div className="p-10 w-full">
			<h1 className="text-4xl font-semibold text-blue-600">Transfer</h1>

			<div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
				<SendMoneyCard />
				<P2pTransfers />
			</div>
		</div>
	);
}
