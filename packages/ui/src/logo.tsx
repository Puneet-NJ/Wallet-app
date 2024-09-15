export const Logo = ({ className }: { className?: string }) => {
	console.log(className);

	return (
		<div
			className={
				className
					? className
					: `flex items-center mx-auto w-full justify-center`
			}
		>
			<span
				className={className ? className : "text-3xl font-extrabold text-white"}
			>
				Wallet
			</span>
			<span
				className={
					(className ? className : "text-3xl font-extrabold ml-1") +
					" text-blue-400"
				}
			>
				Pe
			</span>
		</div>
	);
};
