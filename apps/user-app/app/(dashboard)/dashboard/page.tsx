import { Logo } from "@repo/ui/logo";
import FeatureCard from "components/FeatureCard";
import Link from "next/link";
import { AddMoneyIcon, ManageFinance, TransferIcon } from "../layout";
import TestimonialCard from "components/TestimonialCard";

// Import images and SVGs
// import testimonialImage1 from "/path/to/testimonial1.jpg";
// import testimonialImage2 from "/path/to/testimonial2.jpg";
// import testimonialImage3 from "/path/to/testimonial3.jpg";

const features = [
	{
		title: "Secure Transfers",
		description: "Encrypted and fast transfers, ensuring your funds are safe.",
		image: <TransferIcon />,
	},
	{
		title: "Add Money Easily",
		description: "Add funds through various payment methods in no time.",
		image: <AddMoneyIcon />,
	},
	{
		title: "Manage Finances",
		description:
			"Keep track of your transactions with our user-friendly dashboard.",
		image: <ManageFinance />,
	},
];

const testimonials = [
	{
		review:
			"WalletPe makes my daily transactions so easy and secure! Highly recommended.",
		by: "Priya Sharma",
	},
	{
		review:
			"I love how fast and seamless the transfers are with WalletPe. Never going back!",
		by: "Rahul Mehta",
	},
	{
		review: "The best platform for managing my wallet and payments on the go.",
		by: "Anjali Verma",
	},
];

export default function HomePage() {
	return (
		<div className="min-h-screen bg-black text-white">
			{/* Hero Section */}
			<section className="relative min-h-screen flex py-[40%] md:items-center bg-black text-white md:py-32 border-b border-gray-700 parallax-hero">
				<div className="container mx-auto px-4 flex flex-col md:flex-row items-center z-10">
					<div className="md:w-1/2 text-center md:text-left mx-10  md:mt-0">
						<h1 className="text-6xl font-extrabold mb-5 text-white">
							<Logo className="text-6xl font-extrabold mb-1 inline-block" /> -
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
				</div>

				{/* Decorative elements */}
				<div className="absolute top-0 md:top-0 left-0 w-40 h-40 bg-white rounded-full opacity-20 animate-bounce-more z-0"></div>
				<div className="absolute bottom-0 right-0 w-60 h-60 bg-gray-300 rounded-full opacity-30 animate-bounce-more delay-200 z-0"></div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-[rgba(11,11,11,1)] border-b border-gray-700 parallax-features">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-12 text-white">
						Why Choose WalletPe?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{features.map((feature) => (
							<FeatureCard
								title={feature.title}
								description={feature.description}
								image={feature.image}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20 bg-black border-b border-gray-700 parallax-testimonials">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-12 text-white">
						What Our Users Say
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{testimonials.map((testimonial) => (
							<TestimonialCard
								review={testimonial.review}
								by={testimonial.by}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-16 bg-[rgba(11,11,11,1)]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6 text-white">
						Experience the Future of Payments
					</h2>
					<p className="text-xl mb-8 text-gray-300">
						Get started today and enjoy fast, secure, and reliable transactions.
					</p>
					<Link href="/transfer">
						<div className="inline-block px-10 py-4 bg-indigo-500 text-white rounded-full shadow-lg font-semibold text-lg hover:bg-indigo-600 cursor-pointer">
							Send Money to Friends
						</div>
					</Link>
				</div>
			</section>
		</div>
	);
}
