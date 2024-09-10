"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const session = useSession();

	console.log(session);

	// if (session.data?.user)
	// 	return (
	// 		<div>
	// 			<p>signed in as {session.data.user.email}</p>
	// 			<button onClick={() => signOut()}>Sign out</button>
	// 			<p>{JSON.stringify(session.data.user)}</p>
	// 		</div>
	// 	);

	return (
		<div className="font-bold text-4xl bg-red-200">
			{/* <p>Not signed in</p> */}
			<button onClick={() => signIn()}>Sign in</button>
			<button onClick={() => signOut()}>Sign out</button>

			{JSON.stringify(session)}
		</div>
	);
}
