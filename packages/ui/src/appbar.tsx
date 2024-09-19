import { signIn, signOut } from "next-auth/react";
import { Button } from "./button";
// import { signIn, signOut } from "@repo/next-auth-types/client";

interface Props {
	user?: {
		id: string;
		phone: string;
	};
	signIn: typeof signIn;
	signOut: any;
	// signOut: typeof signOut;
	children: React.ReactNode;
}

export const Appbar = ({ user, signIn, signOut, children }: Props) => {
	return (
		<div className="w-full flex justify-between items-center px-10 py-5 bg-opacity-70 backdrop-blur border-b border-gray-700 shadow-lg sticky top-0 z-50">
			{children}

			<div>
				<Button onClick={() => (user ? signOut() : signIn())}>
					{user ? "Sign out" : "Sign in"}
				</Button>
			</div>
		</div>
	);
};
