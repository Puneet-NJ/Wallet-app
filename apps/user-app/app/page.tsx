"use client";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const session = useSession();

	return (
		<div className=" bg-red-200">
			<Appbar
				user={session?.data?.user}
				signIn={() => signIn()}
				signOut={() => signOut()}
			/>

			{JSON.stringify(session)}
		</div>
	);
}
