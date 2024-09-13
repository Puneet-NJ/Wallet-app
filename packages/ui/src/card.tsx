interface Props {
	title: string;
	children: React.ReactNode;
}

export function Card({ title, children }: Props) {
	return (
		<div className="bg-white py-4 px-5 rounded shadow-md">
			<div className="text-xl font-medium border-b border-gray-300 pb-2">
				{title}
			</div>
			<div>{children}</div>
		</div>
	);
}
