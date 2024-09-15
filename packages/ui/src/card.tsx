interface Props {
	title: string;
	children: React.ReactNode;
	className?: string; // Optional className prop
}

export function Card({ title, children, className = "" }: Props) {
	return (
		<div
			className={`bg-[rgba(25,25,25,1)] hover:bg-[rgba(35,35,35,1)] text-white py-4 px-5 rounded shadow-md ${className}`}
		>
			<div className="text-xl font-medium border-b border-gray-300 pb-2">
				{title}
			</div>
			<div>{children}</div>
		</div>
	);
}
