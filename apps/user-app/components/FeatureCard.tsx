import { TransferIcon } from "@/(dashboard)/layout";

export default function ({
	title,
	description,
	image,
}: {
	title: string;
	description: string;
	image: React.ReactNode;
}) {
	return (
		<div className="flex-col p-8 bg-gray-900 shadow-lg rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
			<div>{image}</div>
			<div>
				<h3 className="text-2xl font-bold mt-6 text-white">{title}</h3>
				<p className="mt-4 text-gray-400">{description}</p>
			</div>
		</div>
	);
}
