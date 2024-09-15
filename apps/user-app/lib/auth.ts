import CredentialsProvider from "next-auth/providers/credentials";
import { userSchema } from "@repo/zod/client";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

export const authOptions = {
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
						return {
							id: existingUser.id.toString(),
							phone: existingUser.phone,
						};
					}

					return null;
				}

				const newUser = await prisma.$transaction(async (tx) => {
					const createdUser = await tx.user.create({
						data: {
							phone: credentials.phone,
							password: hashedPassword,
						},
					});

					await tx.balance.create({
						data: {
							userId: createdUser.id,
							amount: 0 * 100,
						},
					});

					return {
						id: createdUser.id.toString(),
						phone: createdUser.phone,
					};
				});

				return newUser;
			},
		}),
	],
	secret: process.env.JWT_SECRET || "secret",
	callbacks: {
		jwt: async ({ token, user }: { token: JWT; user: User }) => {
			if (user) {
				token.id = user.id;
				token.phone = user.phone;
			}

			return token;
		},
		session: async ({ session, token }: { session: Session; token: JWT }) => {
			if (token) {
				session.user.id = token.id as string;
				session.user.phone = token.phone as string;
			}

			return session;
		},
	},
	pages: {
		signIn: "/signin",
	},
};
