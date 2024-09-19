"use client";
import SidebarElement from "components/SidebarElement";
import { useState } from "react";
import {
	CloseIcon,
	MenuIcon,
	HomeIcon,
	AddMoneyIcon,
	P2pTransfer,
} from "../../components/Icons";

export default function ({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="flex min-h-screen max-w-screen ">
			<div className="w-1/5 hidden md:flex flex-col ml-20 gap-7 pt-20 border-gray-800 border-r">
				<SidebarElement title="Home" icon={<HomeIcon />} to="/dashboard" />
				<SidebarElement
					title="Add Money"
					icon={<AddMoneyIcon />}
					to="/add-money"
				/>
				<SidebarElement
					title="P2P Transfer"
					icon={<P2pTransfer />}
					to="/transfer"
				/>
			</div>

			{/* Sidebar for smaller screens */}
			<div
				className={`h-screen fixed inset-y-[5.6rem] left-0 z-50 w-64 bg-black transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}
			>
				<div className="flex flex-col gap-7 pt-20 border-gray-800 border-r">
					<SidebarElement
						onClick={setSidebarOpen}
						title="Home"
						icon={<HomeIcon />}
						to="/dashboard"
					/>
					<SidebarElement
						onClick={setSidebarOpen}
						title="Add Money"
						icon={<AddMoneyIcon />}
						to="/add-money"
					/>
					<SidebarElement
						onClick={setSidebarOpen}
						title="P2P Transfer"
						icon={<P2pTransfer />}
						to="/transfer"
					/>
				</div>
			</div>

			{/* Toggle button for smaller screens */}
			<div className="md:hidden fixed top-17 left-3 z-50 backdrop-blur p-2">
				<button onClick={toggleSidebar}>
					{sidebarOpen ? (
						<CloseIcon className="text-white" />
					) : (
						<MenuIcon className={"text-white"} />
					)}
				</button>
			</div>

			<div className="w-full">{children}</div>
		</div>
	);
}
