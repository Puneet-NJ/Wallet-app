import { Button } from "./button";
import { Logo } from "./logo";
import { signIn, signOut } from "@repo/next-auth-types/client";

interface Props {
	user?: {
		id: string;
		phone: string;
	};
	signIn: typeof signIn;
	signOut: typeof signOut;
}

export const Appbar = ({ user, signIn, signOut }: Props) => {
	return (
		<div className="flex justify-between items-center bg-slate-100 px-10 py-5 shadow-xl">
			<div>
				<Logo />
			</div>

			<div>
				<Button onClick={() => (user ? signOut() : signIn())}>
					{user ? "Sign out" : "Sign in"}
				</Button>
			</div>
		</div>
	);
};
