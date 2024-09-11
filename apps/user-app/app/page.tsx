"use client";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const session = useSession();

	console.log(session.data?.user);

	return (
		<div className=" bg-red-200">
			<Appbar
				user={session?.data?.user}
				signIn={() => signIn()}
				signOut={() => signOut()}
			/>
			{/* <p>Not signed in</p> */}
			<button onClick={() => signIn()}>Sign in</button>
			<button onClick={() => signOut()}>Sign out</button>

			{JSON.stringify(session)}
		</div>
	);
}
