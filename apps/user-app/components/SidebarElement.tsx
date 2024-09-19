"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
	title: string;
	icon: React.ReactNode;
	to: string;
	onClick?: Dispatch<SetStateAction<boolean>>;
}

export default function ({ title, icon, to, onClick }: Props) {
	const path = usePathname();
	const router = useRouter();
	const currentPath = path === to;

	return (
		<div
			onClick={() => {
				router.push(to);
				onClick ? onClick(false) : null;
			}}
			className={`flex items-center gap-2 text-lg cursor-pointer duration-75 mx-auto md:mx-0 ${currentPath ? "text-blue-500 font-semibold scale-110" : "text-gray-600 font-medium"}`}
		>
			<>{icon}</>
			<span className="">{title}</span>
		</div>
	);
}
