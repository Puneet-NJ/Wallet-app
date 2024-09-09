import prisma from "@repo/db/client";

const getData = async () => {
	const res = await prisma.user.findMany({});

	return res;
};

export default async function Home() {
	const data = await getData();

	console.log(data);

	return <div className="font-bold text-4xl bg-red-200">hello</div>;
}
