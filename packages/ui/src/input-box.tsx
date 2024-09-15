import { ChangeEvent } from "react";

interface Props {
	placeholder?: string;
	id: string;
	type: string;
	className?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	min?: string;
}

export const InputBox = ({
	placeholder,
	id,
	type,
	className,
	onChange,
	min,
}: Props) => {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={id} className="font-medium">
				{id[0]?.toUpperCase() + id.slice(1)}
			</label>

			<input
				placeholder={placeholder}
				id={id}
				type={type}
				onChange={(e) => {
					onChange(e);
				}}
				className={
					className ||
					"py-2 px-3 outline-none border border-gray-400 rounded-md text-black"
				}
				min={min}
			/>
		</div>
	);
};
