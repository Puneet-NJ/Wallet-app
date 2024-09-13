"use client";

import { usePathname, useRouter } from "next/navigation";

interface Props {
	title: string;
	icon: React.ReactNode;
	to: string;
}

export default function ({ title, icon, to }: Props) {
	const path = usePathname();
	const router = useRouter();
	const currentPath = path === to;

	return (
		<div
			onClick={() => {
				router.push(to);
			}}
			className={`flex items-center gap-2 text-lg cursor-pointer duration-75 ${currentPath ? "text-blue-500 font-semibold scale-110" : "text-gray-600 font-medium"}`}
		>
			<>{icon}</>
			<span className="">{title}</span>
		</div>
	);
}
