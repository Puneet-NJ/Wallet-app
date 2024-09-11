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
	console.log(user);

	return (
		<div className="flex justify-between items-center bg-slate-300 px-10 py-3">
			<div>
				<Logo />
			</div>

			<Button onClick={() => (user ? signOut : signIn)}>
				{user ? "Sign out" : "Sign in"}
			</Button>
		</div>
	);
};
