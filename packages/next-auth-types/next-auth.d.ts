import NextAuth from "next-auth";
import { signIn, signOut } from "next-auth/react";

declare module "next-auth" {
	interface User {
		id: string;
		phone: string;
	}

	interface Session {
		user: {
			id: string;
			phone: string;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		phone: string;
	}
}

export const signIn = signIn;
export const signOut = signOut;
