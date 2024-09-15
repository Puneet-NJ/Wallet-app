import { Logo } from "@repo/ui/logo";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-black text-white">
			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center bg-black text-white py-32 overflow-hidden">
				<div className="container mx-auto px-4 flex flex-col md:flex-row items-center z-10">
					<div className="md:w-1/2 text-center md:text-left mx-10">
						<h1 className="text-6xl font-extrabold mb-4 text-white">
							<Logo className="text-6xl font-extrabold mb-1 inline-block" /> –
							Fast. Secure. Easy.
						</h1>
						<p className="text-xl mb-8">
							Experience seamless money transfers, secure payments, and easy
							wallet management.
						</p>
						<Link href="/add-money">
							<div className="inline-block px-10 py-4 bg-white text-black rounded-full shadow-lg font-semibold text-lg hover:bg-gray-300 cursor-pointer">
								Get Started
							</div>
						</Link>
					</div>
					<div className="md:w-1/2 mt-10 md:mt-0">
						{/* <Logo className="w-full h-auto text-white" /> */}
					</div>
				</div>

				{/* Decorative elements */}
				<div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full opacity-20 animate-bounce-more z-0"></div>
				<div className="absolute bottom-0 right-0 w-60 h-60 bg-gray-300 rounded-full opacity-30 animate-bounce-more delay-200 z-0"></div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-gray-900">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-12 text-white">
						Why Choose WalletPe?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						<div className="p-8 bg-gray-800 shadow-lg rounded-lg">
							<h3 className="text-2xl font-bold mt-6 text-white">
								Secure Transfers
							</h3>
							<p className="mt-4 text-gray-400">
								Encrypted and fast transfers, ensuring your funds are safe.
							</p>
						</div>
						<div className="p-8 bg-gray-800 shadow-lg rounded-lg">
							<h3 className="text-2xl font-bold mt-6 text-white">
								Add Money Easily
							</h3>
							<p className="mt-4 text-gray-400">
								Add funds through various payment methods in no time.
							</p>
						</div>
						<div className="p-8 bg-gray-800 shadow-lg rounded-lg">
							<h3 className="text-2xl font-bold mt-6 text-white">
								Manage Finances
							</h3>
							<p className="mt-4 text-gray-400">
								Keep track of your transactions with our user-friendly
								dashboard.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-16 bg-gray-800">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6 text-white">
						Experience the Future of Payments
					</h2>
					<Link href="/signup">
						<div className="inline-block px-10 py-4 bg-white text-black rounded-full shadow-lg font-semibold text-lg hover:bg-gray-300 cursor-pointer">
							Sign Up Now
						</div>
					</Link>
				</div>
			</section>
		</div>
	);
}
