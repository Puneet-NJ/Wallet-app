import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { userSchema } from "@repo/zod/client";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				phone: {
					label: "Phone number",
					placeholder: "1111111111",
					type: "text",
				},
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials: any) {
				// return {
				// 	id: "1",
				// 	phone: "999",
				// 	email: "hi",
				// };
				const validateInput = userSchema.safeParse({
					phone: credentials?.phone,
					password: credentials?.password,
				});
				if (!validateInput.success) {
					return null;
				}

				const hashedPassword = await bcrypt.hash(credentials.password, 10);
				const existingUser = await prisma.user.findUnique({
					where: {
						phone: credentials.phone,
					},
				});

				if (existingUser) {
					const compareHash = await bcrypt.compare(
						credentials.password,
						existingUser.password
					);

					if (compareHash) {
						console.log(existingUser);

						return {
							id: existingUser.id.toString(),
							phone: existingUser.phone,
						};
					}

					return null;
				}

				const response = await prisma.user.create({
					data: {
						phone: credentials.phone,
						password: hashedPassword,
					},
				});

				console.log(response);
				return {
					id: response.id.toString(),
					phone: response.phone,
				};
			},
		}),
	],
	secret: process.env.JWT_SECRET || "secret",
	callbacks: {
		jwt: async ({ token, user }) => {
			console.log("User: " + user?.id);
			console.log(token);

			if (user) {
				(token.id = user.id), (token.phone = user.phone);
			}

			return token;
		},
		session: ({ session, token, user }) => {
			// console.log(token);
			console.log("User: " + user);

			return session;
		},
	},
});

export const GET = handler;
export const POST = handler;
