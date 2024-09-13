import { ChangeEvent } from "react";

interface Props {
	label: string;
	id: string;
	options: {
		key: string;
		value: string;
	}[];
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput = ({ label, id, options, onChange }: Props) => {
	return (
		<div className="flex flex-col gap-1">
			<label className="font-medium" htmlFor={id}>
				{label}
			</label>
			<select
				onChange={(e) => {
					onChange(e);
				}}
				id={id}
				className="p-2 outline-none border border-gray-400 rounded-md text-sm"
			>
				{options.map((option) => (
					<option value={option.key}>{option.value}</option>
				))}
			</select>
		</div>
	);
};
