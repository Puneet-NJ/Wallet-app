export default function ({ review, by }: { review: string; by: string }) {
	return (
		<div className="relative p-8 bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
			{/* <img
								src={testimonialImage1}
								alt={by}
								className="w-24 h-24 rounded-full object-cover absolute top-4 left-4 border-4 border-gray-600"
							/> */}
			<div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-transparent opacity-50"></div>
			<p className="relative mt-6 italic text-gray-300">"{review}"</p>
			<p className="relative mt-4 font-bold text-gray-200">- {by}</p>
		</div>
	);
}
