import prisma from "@repo/db/client";
import AddMoneyCard from "components/AddMoneyCard";
import BalanceCard from "components/BalanceCard";
import OnRampTransactions from "components/OnRampTransactions";
import { authOptions } from "lib/auth";
import { getServerSession } from "next-auth";

const getOnRampTransaction = async () => {
	const session = await getServerSession(authOptions);

	const transactions = await prisma.onRampTransactions.findMany({
		where: {
			userId: Number(session?.user.id),
		},
		select: {
			id: true,
			startDate: true,
			status: true,
			amount: true,
		},
	});

	return {
		transactions,
	};
};

const getBalance = async () => {
	const session = await getServerSession(authOptions);

	const balance = await prisma.balance.findFirst({
		where: {
			userId: Number(session?.user?.id),
		},
	});

	return {
		amount: balance?.amount,
	};
};

export default async function () {
	const balance = await getBalance();
	const { transactions } = await getOnRampTransaction();

	return (
		<div className="p-10 w-full">
			<h1 className="text-4xl font-semibold text-blue-600">Add Money</h1>

			<div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
				<div>
					<AddMoneyCard />
				</div>
				<div>
					{(balance.amount || balance.amount === 0) && (
						<BalanceCard amount={balance.amount} />
					)}
					<div className="pt-4">
						<OnRampTransactions transactions={transactions} />
					</div>
				</div>
			</div>
		</div>
	);
}
