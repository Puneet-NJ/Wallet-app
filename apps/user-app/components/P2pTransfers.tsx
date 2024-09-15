import prisma from "@repo/db/client";
import { Card } from "@repo/ui/card";
import { authOptions } from "lib/auth";
import { getServerSession } from "next-auth";

const getP2pTransfers = async () => {
	const session = await getServerSession(authOptions);
	const id = session?.user.id;

	const transfers = await prisma.p2pTransfers.findMany({
		where: {
			OR: [{ fromId: Number(id) }, { toId: Number(id) }],
		},
	});

	return { transfers, id: Number(id) };
};

export default async function () {
	const { transfers, id } = await getP2pTransfers();

	return (
		<Card title="Recent Transfers">
			{transfers.map((transfer) => (
				<div
					key={transfer.id}
					className="flex justify-between items-center border-b py-2 mx-5"
				>
					<div>
						<div className="font-medium">
							{id === transfer.toId ? "Recieved" : "Paid"}
						</div>
						<div className="text-xs text-gray-500">
							{transfer.time.toString().split(" GMT")[0]}
						</div>
					</div>

					<div className="font-medium">
						{id === transfer.toId ? "+" : "-"} ₹{transfer.amount}
					</div>
				</div>
			))}
		</Card>
	);
}
