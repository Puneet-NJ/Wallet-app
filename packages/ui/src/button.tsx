"use client";

import { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	className?: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
	return (
		<button
			className={
				className ||
				"w-full bg-blue-500 text-white font-medium py-2 px-5 rounded hover:scale-95 hover:bg-black duration-150 mt-2"
			}
			onClick={(e) => {
				onClick(e);
			}}
		>
			{children}
		</button>
	);
};
