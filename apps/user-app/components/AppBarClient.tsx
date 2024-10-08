"use client";
import { Appbar } from "@repo/ui/appbar";
import { Logo } from "@repo/ui/logo";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function () {
	const session = useSession();
	const router = useRouter();
	const path = usePathname();

	if (path === "/signin") return null; // Fixed null return
	return (
		<div className="w-full sticky top-0 z-50">
			<Appbar
				user={session?.data?.user}
				signIn={() => signIn()}
				signOut={async () => {
					await signOut({ redirect: false });
					router.push("/signin");
				}}
			>
				<Link href={"/dashboard"}>
					<Logo />
				</Link>
			</Appbar>
		</div>
	);
}
